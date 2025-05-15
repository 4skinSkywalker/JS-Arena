import { Component, computed, HostListener, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';
import { focus, check, debounce, deepCopy, delay, drag, equal, matrixRain, uncheck } from '../../../utils';
import { IChatReceivedMessage, IClientJSON, IClientWithRoomMessage, ILogMessage, IProgressReceivedMessage, IRoomDetailsReceivedMessage, IRoomJSON, IScore, ITest } from '../../../../../backend/src/models';
import { BasicModule } from '../../basic.module';
import { FormControl } from '@angular/forms';
import { MarkdownService } from '../../services/markdown.service';
import { LoaderService } from '../../components/loader/loader-service.service';
import { DEFAULT_EDITOR_CONTENT } from './game.const';
import { getFakeClient, getFakeRoom } from './game.util';

interface IClientWithScore extends IClientJSON, IScore {}
interface ILoggerMethods {
  log?: () => void;
  warn?: () => void;
  error?: () => void;
}

@Component({
  selector: 'app-game',
  imports: [BasicModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  DEFAULT_EDITOR_CONTENT = DEFAULT_EDITOR_CONTENT;
  JSON = JSON;
  check = check;
  uncheck = uncheck;
  roomId;
  aceEditor: any;
  editorContentKey;
  editorContent = signal("");
  navTab = signal<"instructions" | "benchmark">("instructions");
  consoleLogMessages = signal<ILogMessage[]>([]);
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
  clientScoreMap = signal<Record<string, IScore>>({});
  clientsSortByScore = computed<IClientWithScore[]>(() => {
    return [...(this.room()?.clients || [])]
      .map(client => ({
        ...deepCopy(client),
        testsPassed: this.clientScoreMap()?.[client.id]?.testsPassed || 0,
        charCount: this.clientScoreMap()?.[client.id]?.charCount || DEFAULT_EDITOR_CONTENT.length
      }))
      .sort((a, b) => b.testsPassed - a.testsPassed);
  });
  clientsSortByCharCount = computed<IClientWithScore[]>(() => {
    return [...(this.room()?.clients || [])]
      .map(client => ({
        ...deepCopy(client),
        testsPassed: this.clientScoreMap()?.[client.id]?.testsPassed || 0,
        charCount: this.clientScoreMap()?.[client.id]?.charCount || DEFAULT_EDITOR_CONTENT.length
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
    private route: ActivatedRoute,
    private loaderService: LoaderService,
  ) {
    this.roomId = this.route.snapshot.paramMap.get("id");
    this.editorContentKey = `editor-content-${this.roomId}`;
    this.client = toSignal(this.api.client$);
    this.isHost = computed(() => {
      const room = this.room();
      const client = this.client();
      return !!room && !!room.host && !!client && room.host.id === client.id;
    });
  }

  ngOnInit() {
    this.api.subscribe(this.handlers);
    this.api.send("joinRoom", { roomId: this.roomId });
    this.api.send("roomDetails", { roomId: this.roomId });
    this.loaderService.isLoading.set(true);
  }

  async ngAfterViewInit() {
    await delay(0.2);
    this.initEditor();
    this.initGameResize();
    this.initEditorResize();
    this.initContentResize();
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
  }

  initEditor() {
    const ace = (window as any).ace;
    console.log("Initializing editor", ace);
    const aceEditor = ace.edit("editor");
    this.aceEditor = aceEditor;
    aceEditor.setTheme("ace/theme/monokai");

    ace.require("ace/ext/emmet").setCore("ext/emmet_core");
    ace.config.loadModule("ace/snippets/javascript", () =>
      console.log("JS snippets loaded.")
    );

    aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableEmmet: true,
    });

    aceEditor.getSession().setUseWorker(false);
    aceEditor.getSession().setMode("ace/mode/javascript");

    let memory: string[] = [];
    aceEditor.on("paste", function(pasteObj: any) {
        const content = aceEditor.getValue();
        if (content.includes(pasteObj.text) || memory.some(content => content.includes(pasteObj.text))) {
          console.log("Paste allowed:", pasteObj.text);
          return pasteObj.text;
        } else {
          console.log("Paste forbidden:", pasteObj.text);
          check("#cannot-copy-paste-modal-trigger");
          focus(".cannot-copy-paste-modal button");
          setTimeout(() => {
            aceEditor.setValue(content);
            aceEditor.clearSelection();
          }, 100);
          return "";
        }
    });

    aceEditor.getSession().on("change", debounce(() => {
      const content = aceEditor.getSession().getValue();
      memory.push(content);
      if (memory.length > 100) {
        memory.shift();
      }
      this.onEditorValueChange(content);
    }, 500));

    const lastEditorContent = localStorage.getItem(this.editorContentKey) || '';
    if (lastEditorContent) {
      aceEditor.setValue(lastEditorContent);
    } else {
      aceEditor.setValue(DEFAULT_EDITOR_CONTENT);
    }

    aceEditor.clearSelection();
  }

  onEditorValueChange(value: string) {
    this.editorContent.set(value);
    localStorage.setItem(this.editorContentKey, value);
    this.api.send("progress", { roomId: this.roomId, charCount: value.length });
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
      this.scrollToBottom(".console");
    };
  }

  async runCode(input: any, loggers?: ILoggerMethods) {
    this.consoleLogMessages.set([]);
    await delay(0.1);

    (window as any).llog = !loggers?.log ? this.consoleLog("log") : loggers.log;
    (window as any).lwarn = !loggers?.warn ? this.consoleLog("warn") : loggers.warn;
    (window as any).lerror = !loggers?.error ? this.consoleLog("error") : loggers.error;

    const modifiedContent = this.editorContent()
      .replace(/console\.log/g, "llog")
      .replace(/console\.warn/g, "lwarn")
      .replace(/console\.error/g, "lerror");
    
    let output;
    try {
      window.eval(modifiedContent);
      output = (window as any).solution(input);
    } catch (e: any) {
      (window as any).lerror(e.message || e);
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
    if (this.testsRunning()) {
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
      text
    };
    this.chatMessages.update(prev => [...prev, chatMsg]);
    this.scrollToBottom(".chat");
  }

  sendChatMessage(message: string) {
    this.api.send("chat", { roomId: this.roomId, text: message });
    this.chatMessage.setValue("");
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
    if (msg.room.id !== this.roomId) {
      return;
    }
    this.chatMessages.update(prev => [...prev, msg]);
    this.scrollToBottom(".chat");
  }

  handleRoomDetailsReceived(msg: IRoomDetailsReceivedMessage) {
    if (msg.room.id !== this.roomId) {
      return;
    }

    this.room.set(msg.room);

    if (!this.initializedRoom()) {
      this.loaderService.isLoading.set(false);
      if (msg.room.started) {
        this.alreadyStartedOnInit.set(true);
        this.generateSystemMessage(`Game already started`);
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
    if (msg.room.id !== this.roomId) {
      return;
    }
    this.generateSystemMessage(`Client ${msg.client.name} joined the room`);
  }

  handleClientLeft(msg: IClientWithRoomMessage) {
    if (msg.room.id !== this.roomId) {
      return;
    }
    this.generateSystemMessage(`Client ${msg.client.name} left the room`);
  }

  resetGame() {
    this.aceEditor.setValue(DEFAULT_EDITOR_CONTENT);
    this.aceEditor.clearSelection();

    this.navTab.set("instructions");
    
    this.consoleLogMessages.set([]);

    this.problemDescription.set("");
    this.problemTests.set([]);

    this.alreadyStartedOnInit.set(false);
    this.roomStarted.set(false);
    this.countdownExpired.set(false);
    this.winnerName.set("");

    this.api.send("progress", { roomId: this.roomId, testsPassed: 0 });
    this.api.send("progress", { roomId: this.roomId, charCount: DEFAULT_EDITOR_CONTENT.length });
  }

  handleGameStarted() {
    this.resetGame();
    this.countdownAnimation();
  }

  handleProgressReceived(msg: IProgressReceivedMessage) {
    if (msg.room.id !== this.roomId) {
      return;
    }

    if (!this.winnerName() && msg.testsPassed === this.problemTests().length) {
      this.winnerName.set(msg.client.name);
      this.gameOver();
    }

    this.clientScoreMap.update(prev => ({
      ...prev,
      [msg.client.id]: {
        testsPassed: msg.testsPassed ?? prev[msg.client.id]?.testsPassed,
        charCount: msg.charCount ?? prev[msg.client.id]?.charCount
      }
    }));
    this.room.set(this.room()); // Recompute dependant signals
  }
}
