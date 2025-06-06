import { Component, computed, effect, HostListener, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';
import { focus, check, debounce, deepCopy, delay, drag, equal, matrixRain, uncheck, copyToClipboard } from '../../../utils';
import { IChatReceivedMessage, IClientJSON, IClientWithRoomMessage, ILogMessage, IProgressDetails, IProgressReceivedMessage, IRoomDetailsReceivedMessage, IRoomJSON, ITest } from '../../../../../backend/src/models';
import { BasicModule } from '../../basic.module';
import { FormControl } from '@angular/forms';
import { MarkdownService } from '../../services/markdown.service';
import { LoaderService } from '../../components/loader/loader-service.service';
import { DEFAULT_EDITOR_CONTENT, getExecutableStr } from './game.const';
import { getFakeClient, getFakeRoom, solutionLength } from './game.util';
import { VoipService } from '../../services/voip.service';

interface IClientWithScore extends IClientJSON, IProgressDetails {}
interface ILoggerMethods {
  log?: (...l: any) => void;
  warn?: (...l: any) => void;
  error?: (...l: any) => void;
}

@Component({
  selector: 'app-game',
  imports: [BasicModule],
  providers: [VoipService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  DEFAULT_EDITOR_CONTENT = DEFAULT_EDITOR_CONTENT;
  JSON = JSON;
  check = check;
  uncheck = uncheck;
  roomId;
  editor: any;
  spyEditor: any;
  editorContentKey;
  editorContent = signal("");
  consoleMode = signal<"console" | "spy">("console");
  selectedSpyClient = signal("");
  navTab = signal<"instructions" | "benchmark">("instructions");
  consoleLogMessages = signal<ILogMessage[]>([]);
  consoleEval = new FormControl("", { nonNullable: true });
  exprHistory: string[] = [];
  exprHistoryIndex = 0;
  chatMessages = signal<IChatReceivedMessage[]>([]);
  chatMessage = new FormControl("", { nonNullable: true });
  initializedRoom = signal(false);
  alreadyStartedOnInit = signal(false);
  room = signal<IRoomJSON | null | undefined>(null);
  client: Signal<IClientJSON | null | undefined>;
  isHost: Signal<boolean>;

  testsRunning = signal(false);
  roomStarted = signal(false);
  countdown = signal(0);
  countdownRunning = signal(false);
  countdownExpired = signal(false);
  hasGameStarted = computed(() => 
    this.alreadyStartedOnInit() || 
    (this.roomStarted() && this.countdownExpired())
  );
  problemDescription = signal("");
  problemTests = signal<ITest[]>([]);
  clientProgressDataMap = signal<Record<string, IProgressDetails>>({});
  clients = computed<IClientJSON[]>(() => {
    return [...(this.room()?.clients || [])];
  });
  clientsSortByScore = computed<IClientWithScore[]>(() => {
    return [...(this.room()?.clients || [])]
      .map(client => ({
        ...deepCopy(client),
        testsPassed: this.clientProgressDataMap()?.[client.id]?.testsPassed || 0,
        charCount: this.clientProgressDataMap()?.[client.id]?.charCount || solutionLength(DEFAULT_EDITOR_CONTENT)
      }))
      .sort((a, b) => b.testsPassed - a.testsPassed);
  });
  clientsSortByCharCount = computed<IClientWithScore[]>(() => {
    return [...(this.room()?.clients || [])]
      .map(client => ({
        ...deepCopy(client),
        testsPassed: this.clientProgressDataMap()?.[client.id]?.testsPassed || 0,
        charCount: this.clientProgressDataMap()?.[client.id]?.charCount || solutionLength(DEFAULT_EDITOR_CONTENT)
      }))
      .sort((a, b) => a.charCount - b.charCount);
  });
  winnerName = signal("");
  matrixInterval: any;

  handlers: Handlers = {
    "chatReceived": this.handleChatReceived.bind(this),
    "roomDetailsReceived": this.handleRoomDetailsReceived.bind(this),
    "clientJoined": this.handleClientJoined.bind(this),
    "clientLeft": this.handleClientLeft.bind(this),
    "gameStarted": this.handleGameStarted.bind(this),
    "progressReceived": this.handleProgressReceived.bind(this),
  };

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      this.runCode(this.problemTests()[0]?.input || null);
    }

    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      this.runAllTests();
    }
  }

  constructor(
    public api: ApiService,
    public markdownService: MarkdownService,
    public voip: VoipService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
  ) {
    this.roomId = this.route.snapshot.paramMap.get("id")!;
    this.editorContentKey = `editor-content-${this.roomId}`;
    this.client = toSignal(this.api.client$);
    this.isHost = computed(() => {
      const room = this.room();
      const client = this.client();
      return !!room && !!room.host && !!client && room.host.id === client.id;
    });

    // Initialize voip
    this.voip.initialize(this.roomId);
    let voipCalling = this.voip.calling();
    effect(() => {
      const username = this.client()?.name || "Anonymous";
      if (voipCalling && !this.voip.calling()) {
        this.sendChatMessage(`${username} disconnected from voice chat`, true);
      } else if (this.voip.calling()) {
        this.sendChatMessage(`${username} connected to voice chat`, true);
      }
      voipCalling = this.voip.calling();
    });
  }

  ngOnInit() {
    this.api.subscribe(this.handlers);
    this.api.send("joinRoom", { roomId: this.roomId });
    this.api.send("roomDetails", { roomId: this.roomId });
    this.loaderService.isLoading.set(true);
  }

  async ngAfterViewInit() {
    await delay(0.2); // TODO: I don't remember why I need this delay
    this.initEditor();
    this.initSpyEditor();
    this.initGameResize();
    this.initEditorResize();
    this.initContentResize();
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
  }

  shareLink() {
    const linkEl = document.getElementById("share-link")!;
    const prevText = linkEl.innerText;
    if (prevText === "Copied!") {
      return;
    }
    copyToClipboard(window.location.href);
    linkEl.innerText = "Copied!"
    setTimeout(() => linkEl.innerText = prevText, 2000);
  }

  evalCtx = {};
  evalExpr(expr: string) {
    this.exprHistory.push(expr);
    this.exprHistoryIndex = this.exprHistory.length;
    try {
      const output = eval.bind(this.evalCtx)(expr);
      if (output) {
        this.consoleLog("log")(JSON.stringify(output));
      }
    } catch (e: any) {
      this.consoleLog("error")(e.message || e);
    } finally {
      this.consoleEval.setValue("");
    }
  }
  historyBack() {
    this.exprHistoryIndex = Math.max(0, this.exprHistoryIndex - 1);
    this.consoleEval.setValue(this.exprHistory[this.exprHistoryIndex]);
  }
  historyForward() {
    this.exprHistoryIndex = Math.min(this.exprHistory.length - 1, this.exprHistoryIndex + 1);
    this.consoleEval.setValue(this.exprHistory[this.exprHistoryIndex]);
  }

  onEditorValueChange(value: string) {
    this.editorContent.set(value);
    localStorage.setItem(this.editorContentKey, value);
    this.api.send("progress", {
      roomId: this.roomId,
      charCount: solutionLength(value),
      editorContent: value
    });
  }

  initEditor() {
    const ace = (window as any).ace;
    const editor = ace.edit("editor");
    this.editor = editor;
    editor.setTheme("ace/theme/monokai");
    
    ace.require("ace/ext/language_tools");
    ace.require("ace/ext/emmet").setCore("ext/emmet_core");
    ace.config.loadModule("ace/snippets/javascript", () =>
      console.log("JS snippets loaded.")
    );

    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableEmmet: true,
    });

    editor.getSession().setUseWorker(false);
    editor.getSession().setMode("ace/mode/javascript");

    let memory: string[] = [];
    editor.on("paste", (pasteObj: any) => {
      const editorContent = editor.getValue();
      const content = `${this.problemDescription()}\n${JSON.stringify(this.problemTests())}\n${editorContent}`;
      if (content.includes(pasteObj.text) || memory.some(content => content.includes(pasteObj.text))) {
        console.log("Paste allowed:", pasteObj.text);
        return pasteObj.text;
      }

      console.log("Paste forbidden:", pasteObj.text);
      check("#cannot-copy-paste-modal-trigger");
      focus(".cannot-copy-paste-modal button");
      setTimeout(() => {
        editor.setValue(editorContent);
        editor.clearSelection();
      }, 100);
      return "";
    });

    editor.getSession().on("change", debounce(() => {
      const content = editor.getSession().getValue();
      memory.push(content);
      if (memory.length > 100) {
        memory.shift();
      }
      this.onEditorValueChange(content);
    }, 500));

    const lastEditorContent = localStorage.getItem(this.editorContentKey) || '';
    if (lastEditorContent) {
      editor.setValue(lastEditorContent);
    } else {
      editor.setValue(DEFAULT_EDITOR_CONTENT);
    }

    editor.clearSelection();
  }

  initSpyEditor() {
    const ace = (window as any).ace;
    const editor = ace.edit("spyEditor");
    this.spyEditor = editor;
    editor.setTheme("ace/theme/monokai");

    editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableEmmet: true,
    });

    editor.keyBinding.$defaultHandler.commandKeyBinding = {}
    editor.textInput.getElement().disabled = true;

    editor.getSession().setUseWorker(false);
    editor.getSession().setMode("ace/mode/javascript");
    editor.clearSelection();
  }

  initGameResize() {
    const gameContainer = document.querySelector(".game-container") as HTMLDivElement;
    const editorContainer = document.querySelector(".editor-container");
    const contentContainer = document.querySelector(".content-container");
    const sectionsDivider = document.querySelector(".sections-divider");
    drag({
      target: sectionsDivider,
      downCb: (evt: any, ctx: any) => {
        ctx.editorContainerWidth = editorContainer?.clientWidth;
        ctx.contentContainerWidth = contentContainer?.clientWidth;
      },
      moveCb: (evt: any, ctx: any) => {
        if (gameContainer) {
          gameContainer.style.gridTemplateColumns = `${ctx.editorContainerWidth + ctx.pos}px ${ctx.contentContainerWidth - ctx.pos}px`;
        }
      },
      direction: "x"
    });
  }

  initEditorResize() {
    const editorContainer = document.querySelector(".editor-container") as HTMLDivElement;
    const editorWrap = document.querySelector(".editor-wrap");
    const consoleContainer = document.querySelector(".console-container");
    const consoleTitle = document.querySelector(".console-title");
    drag({
      target: consoleTitle,
      downCb: (evt: any, ctx: any) => {
        ctx.editorWrapHeight = editorWrap?.clientHeight;
        ctx.consoleContainerHeight = consoleContainer?.clientHeight;
      },
      moveCb: (evt: any, ctx: any) => {
        if (editorContainer) {
          editorContainer.style.gridTemplateRows = `${ctx.editorWrapHeight + ctx.pos}px ${ctx.consoleContainerHeight - ctx.pos}px`;
        }
      },
      direction: "y"
    });
  }

  initContentResize() {
    const contentContainer = document.querySelector(".content-container") as HTMLDivElement;
    const instructionsContainer = document.querySelector(".instructions-container");
    const chatContainer = document.querySelector(".chat-container");
    const chatTitle = document.querySelector(".chat-title");
    drag({
      target: chatTitle,
      downCb: (evt: any, ctx: any) => {
        ctx.instructionsContainerHeight = instructionsContainer?.clientHeight;
        ctx.chatContainerHeight = chatContainer?.clientHeight;
      },
      moveCb: (evt: any, ctx: any) => {
        if (contentContainer) {
          contentContainer.style.gridTemplateRows = `${ctx.instructionsContainerHeight + ctx.pos}px ${ctx.chatContainerHeight - ctx.pos}px`;
        }
      },
      direction: "y"
    });
  }

  async scrollToBottom(selector: string) {
    await delay(0.15);
    const el = document.querySelector(selector) as HTMLDivElement;
    el.scrollTop = el.scrollHeight;
  }

  createLog(level: "log" | "warn" | "error", args: any) {
    return {
      level,
      text: args.map((arg: any) =>
        (typeof arg === "string") ? arg : JSON.stringify(arg)
      ).join(" ")
    };
  }

  consoleLog(level: "log" | "warn" | "error") {
    return (...args: any) => {
      this.consoleLogMessages.update(prev => [...prev, this.createLog(level, args)]);
      this.scrollToBottom(".console-logs");
    };
  }

  runInWorker(scr: string) {
    const w = new Worker(new URL("w.js", import.meta.url));
    return new Promise<any>((resolve, reject) => {
      let timedout = false;
      const timer = setTimeout(() => {
        timedout = true;
        w.terminate();
        reject("Timeout");
      }, 1000);

      w.onmessage = (e: any) => {
        if (!timedout) {
          clearTimeout(timer);
          resolve(e.data);
        }
      }

      w.onerror = (e: any) => {
        if (!timedout) {
          clearTimeout(timer);
          reject(e);
        }
      }

      w.postMessage(scr);
    });
  }

  async runCode(input: any, loggers?: ILoggerMethods) {
    this.consoleLogMessages.set([]);
    await delay(0.1);
    
    let output, logs;
    try {
      const modifiedContent = getExecutableStr(this.editorContent(), input);
      if (window.Worker) {
        [output, logs] = await this.runInWorker(modifiedContent);
      } else {
        [output, logs] = window.eval(modifiedContent);
      }
    } catch (e: any) {
      logs = logs || [];
      logs.push({ type: "error", args: [e.message || e] });
    }

    logs.forEach((line: { type: "log" | "warn" | "error", args: any }) => {
      if (loggers && loggers[line.type]) {
        loggers[line.type]!(...line.args);
      } else {
        this.consoleLog(line.type)(...line.args);
      }
    });

    if (!loggers) {
      this.consoleLog("log")(output);
    }

    return output;
  }

  async runSingleTest(test: ITest) {
    test.output = null;
    test.logs = [];
    test.status = "running";

    await delay(0.1);
    const output = await this.runCode(
      test.input,
      {
        log: (...args: any) => test.logs?.push(this.createLog("log", args)),
        warn: (...args: any) => test.logs?.push(this.createLog("warn", args)),
        error: (...args: any) => test.logs?.push(this.createLog("error", args))
      }
    );

    if (equal(output, test.expectedOutput)) {
      test.status = "passed";
    } else {
      test.status = "failed";
    }

    test.output = output;
    this.problemTests.set(this.problemTests().map(t => t === test ? test : t));
    return test.status === "passed";
  }

  async runAllTests() {
    if (this.testsRunning() || this.problemTests().length === 0) {
      return;
    }

    this.testsRunning.set(true);
    this.navTab.set("benchmark");
    let testsPassed = 0;
    for (const test of this.problemTests()) {
      if (await this.runSingleTest(test)) {
        testsPassed++;
      }
    }
    this.api.send("progress", { roomId: this.roomId, testsPassed });
    this.testsRunning.set(false);
  }

  generateSystemMessage(text: string) {
    const chatMsg = {
      id: "-1",
      room: getFakeRoom(),
      client: getFakeClient(),
      time: "00:00:00",
      text,
      isSystem: true,
    };
    this.chatMessages.update(prev => [...prev, chatMsg]);
    this.scrollToBottom(".chat");
  }

  sendChatMessage(text: string, isSystem = false) {
    this.api.send("chat", {
      roomId: this.roomId,
      text,
      isSystem,
    });

    if (!isSystem) {
      this.chatMessage.setValue("");
    }
  }

  async flickAnimation(el: Element | null) {
    if (el) {
      el.classList.remove("animation");
      await delay(0.1);
      el.classList.add("animation");
    }
  }

  async countdownAnimation() {
    this.countdownRunning.set(true);
    const countdown = document.querySelector(".countdown");
    for (const num of [3, 2, 1]) {
      this.countdown.set(num);
      this.flickAnimation(countdown);
      this.generateSystemMessage(`Game starts in ${num} seconds`);
      await delay(1);
    }
    this.generateSystemMessage("Game started. Good luck!");
    this.countdownExpired.set(true);
    this.countdownRunning.set(false);
  }

  startGame() {
    this.api.send("startGame", { roomId: this.roomId });
  }

  gameOver() {
    this.generateSystemMessage(`Game over. User ${this.winnerName()} won the game!`);
    check("#game-over-trigger");
    focus(".game-over-modal button");
    this.matrixInterval = matrixRain("#matrix-canvas");
  }

  gameOverOk() {
    clearInterval(this.matrixInterval);
    uncheck("#game-over-trigger");
  }

  areYouSureNewGame() {
    check("#are-you-sure-new-game");
  }

  areYouSureNewGameOk() {
    this.api.send("restartGame", { roomId: this.roomId });
    uncheck("#are-you-sure-new-game");
  }

  kickPlayer() {
    alert("Not implemented yet"); // TODO
  }

  handleChatReceived(msg: IChatReceivedMessage) {
    this.chatMessages.update(prev => [...prev, msg]);
    this.scrollToBottom(".chat");
  }

  handleRoomDetailsReceived(msg: IRoomDetailsReceivedMessage) {
    this.room.set(msg.room);

    if (!this.initializedRoom()) {
      this.loaderService.isLoading.set(false);
      if (msg.room.started) {
        this.alreadyStartedOnInit.set(true);
        this.generateSystemMessage("Game already started");
      }
    }
    this.initializedRoom.set(true);

    if (msg.room.problem && !this.roomStarted()) {
      this.roomStarted.set(msg.room.started);
      this.problemDescription.set(msg.room.problem.description);
      this.problemTests.set(msg.room.problem.tests);
    }
  }

  handleClientJoined(msg: IClientWithRoomMessage) {
    this.generateSystemMessage(`Client ${msg.client.name} joined the room`);
  }

  handleClientLeft(msg: IClientWithRoomMessage) {
    this.generateSystemMessage(`Client ${msg.client.name} left the room`);
  }

  resetGame() {
    this.editor.setValue(DEFAULT_EDITOR_CONTENT);
    this.editor.clearSelection();

    this.navTab.set("instructions");
    
    this.consoleLogMessages.set([]);

    this.problemDescription.set("");
    this.problemTests.set([]);

    this.alreadyStartedOnInit.set(false);
    this.roomStarted.set(false);
    this.countdownExpired.set(false);
    this.winnerName.set("");

    this.api.send("progress", {
      roomId: this.roomId,
      testsPassed: 0,
      charCount: solutionLength(DEFAULT_EDITOR_CONTENT)
    });
  }

  handleGameStarted() {
    this.resetGame();
    this.countdownAnimation();
  }

  handleProgressReceived(msg: IProgressReceivedMessage) {
    if (!this.winnerName() && msg.testsPassed === this.problemTests().length) {
      this.winnerName.set(msg.client.name);
      this.gameOver();
    }

    if (this.selectedSpyClient() && msg.client.id === this.selectedSpyClient() && msg.editorContent) {
      this.spyEditor.setValue(msg.editorContent);
      this.spyEditor.clearSelection();
    }

    this.clientProgressDataMap.update(prev => ({
      ...prev,
      [msg.client.id]: {
        testsPassed: msg.testsPassed ?? prev[msg.client.id]?.testsPassed,
        charCount: msg.charCount ?? prev[msg.client.id]?.charCount,
        editorContent: msg.editorContent ?? prev[msg.client.id]?.editorContent
      }
    }));
    this.room.set(this.room()); // Recompute dependant signals
  }

  changeSpyClient(clientId: string) {
    this.selectedSpyClient.set(clientId);
    if (clientId === "Select player") {
      this.spyEditor.setValue("");
      this.spyEditor.clearSelection();
      return;
    }

    const editorContent = this.clientProgressDataMap()[clientId].editorContent;
    if (editorContent) {
      this.spyEditor.setValue(editorContent);
      this.spyEditor.clearSelection();
    }
  }
}
