import { Component, computed, effect, HostListener, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Handlers } from '../../../services/api.service';
import { focus, check, debounce, deepCopy, delay, drag, equal, matrixRain, uncheck, copyToClipboard, loadFromLS, scrollBottom, scrollTop } from '../../../shared/utils';
import { EnumLang, IChatReceivedMessage, IClientJSON, IClientWithRoomMessage, IProgressDetails, IProgressReceivedMessage, IRoomDetailsReceivedMessage, IRoomJSON, ITest } from '../../../../../../backend/src/models';
import { BasicModule } from '../../../basic.module';
import { FormControl } from '@angular/forms';
import { MarkdownService } from '../../../services/markdown.service';
import { LoaderService } from '../../../components/loader/loader-service.service';
import { getFakeClient, getFakeRoom, solutionLength } from './game-multiplayer.util';
import { VoipService } from '../../../services/voip.service';
import { DEFAULT_SQL_EDITOR_CONTENT } from '../../../shared/game.const';
import { DBService } from '../../../services/db.service';

interface IClientWithScore extends IClientJSON, IProgressDetails {}

@Component({
  selector: 'app-sql-game-multiplayer',
  imports: [BasicModule],
  providers: [VoipService],
  templateUrl: './game-multiplayer.component.html',
  styleUrl: './game-multiplayer.component.scss'
})
export class SQLGameMultiplayerComponent {
  Object = Object;
  DEFAULT_EDITOR_CONTENT = DEFAULT_SQL_EDITOR_CONTENT;
  JSON = JSON;
  check = check;
  uncheck = uncheck;
  roomId;
  editor: any;
  spyEditor: any;
  editorContentKey;
  editorContent = signal("");
  selectedSpyClient = signal("");
  navTab = signal<"instructions" | "benchmark">("instructions");
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
        charCount: this.clientProgressDataMap()?.[client.id]?.charCount || solutionLength(DEFAULT_SQL_EDITOR_CONTENT)
      }))
      .sort((a, b) => b.testsPassed - a.testsPassed);
  });
  clientsSortByCharCount = computed<IClientWithScore[]>(() => {
    return [...(this.room()?.clients || [])]
      .map(client => ({
        ...deepCopy(client),
        testsPassed: this.clientProgressDataMap()?.[client.id]?.testsPassed || 0,
        charCount: this.clientProgressDataMap()?.[client.id]?.charCount || solutionLength(DEFAULT_SQL_EDITOR_CONTENT)
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
    if (event.ctrlKey && event.key === "Enter") {
      event.preventDefault();
      this.runAllTests();
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault(); // stop browser Save dialog
    }
  }

  constructor(
    public api: ApiService,
    public markdownService: MarkdownService,
    public voip: VoipService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private db: DBService,
  ) {
    this.roomId = this.route.snapshot.paramMap.get("id")!;
    this.editorContentKey = `multiplayer-editor-content-${this.roomId}`;
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
    (window as any).game = this;
    this.api.subscribe(this.handlers);
    this.loaderService.isLoading.set(true);
  }

  async ngAfterViewInit() {
    await delay(0.2);
    this.initEditor();
    this.initSpyEditor();
    this.initGameResize();
    this.initEditorResize();
    this.initContentResize();
    this.api.send("joinRoom", { roomId: this.roomId });
    this.api.send("roomDetails", { roomId: this.roomId });
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
    this.loaderService.isLoading.set(false);
    clearInterval(this.matrixInterval);
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
    ace.require("ace/ext/language_tools");
    ace.require("ace/ext/emmet").setCore("ext/emmet_core");
    ace.config.loadModule("ace/snippets/sql", () => console.log("SQL snippets loaded."));
    
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableEmmet: true,
    });

    this.editor.getSession().setUseWorker(false);
    this.editor.getSession().setMode("ace/mode/sql");

    let memory: string[] = [];
    this.editor.on("paste", (pasteObj: any) => {
      const editorContent = this.editor.getValue();
      const content = `${this.problemDescription()}\n${JSON.stringify(this.problemTests())}\n${editorContent}\n~\``;
      if (content.includes(pasteObj.text) || memory.some(content => content.includes(pasteObj.text))) {
        console.log("Paste allowed:", pasteObj.text);
        return pasteObj.text;
      }

      console.log("Paste forbidden:", pasteObj.text);
      check("#cannot-copy-paste-modal-trigger");
      focus(".cannot-copy-paste-modal button");
      setTimeout(() => {
        this.editor.setValue(editorContent);
        this.editor.clearSelection();
      }, 100);
      return "";
    });

    this.editor.getSession().on("change", debounce(() => {
      const content = this.editor.getSession().getValue();
      memory.push(content);
      if (memory.length > 100) {
        memory.shift();
      }
      this.onEditorValueChange(content);
    }, 150));

    const lastEditorContent = localStorage.getItem(this.editorContentKey) || '';
    if (lastEditorContent) {
      this.editor.setValue(lastEditorContent);
    } else {
      this.editor.setValue(DEFAULT_SQL_EDITOR_CONTENT);
    }

    this.editor.clearSelection();
  }

  initSpyEditor() {
    const ace = (window as any).ace;
    this.spyEditor = ace.edit("spyEditor");
    this.spyEditor.setTheme("ace/theme/monokai");
    this.spyEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableEmmet: true,
    });

    this.spyEditor.keyBinding.$defaultHandler.commandKeyBinding = {}
    this.spyEditor.textInput.getElement().disabled = true;

    this.spyEditor.getSession().setUseWorker(false);
    this.spyEditor.getSession().setMode("ace/mode/sql");
    this.spyEditor.clearSelection();
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

  async runSingleTest(test: ITest) {
    test.output = null;
    test.status = "running";
    test.logs = [];

    await delay(0.1);

    let received;
    try {
      try {
        console.log({ execResult: await this.db.exec(test.scripts?.join("\n") || "") });
      } catch (e: any) {
        throw new Error(`System error - ${e?.message || "Unknown error"}`);
      }

      let execResult;
      try {
        execResult = await this.db.exec(this.editorContent());
      } catch (e: any) {
        throw new Error(`User script error - ${e?.message || "Unknown error"}`);
      }

      received = execResult.pop().rows;
      console.log({ results: received });
    } catch (e: any) {
      test.logs?.push({ level: "error", text: e?.message || "Unknown error" });
      test.status = "failed";
      return;
    }

    if (equal(test.expectedOutput, received)) {
      test.status = "passed";
    } else {
      test.status = "failed";
    }

    test.output = received;
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
      room: getFakeRoom(EnumLang.SQL),
      client: getFakeClient(),
      time: "00:00:00",
      text,
      isSystem: true,
    };
    this.chatMessages.update(prev => [...prev, chatMsg]);
    scrollBottom(".chat");
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
    scrollBottom(".chat");
  }

  handleRoomDetailsReceived(msg: IRoomDetailsReceivedMessage) {
    this.room.set(msg.room);

    if (!this.initializedRoom()) {
      this.loaderService.isLoading.set(false);
      if (msg.room.started) {
        this.alreadyStartedOnInit.set(true);
        this.generateSystemMessage("Game already started");
      }

      this.api.send("claimRoomHosting", { secret: loadFromLS("roomSecret") || "" });
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
    this.editor.setValue(DEFAULT_SQL_EDITOR_CONTENT);
    this.editor.clearSelection();

    this.navTab.set("instructions");
    scrollTop(".nav-panel-description")

    this.problemDescription.set("");
    this.problemTests.set([]);

    this.alreadyStartedOnInit.set(false);
    this.roomStarted.set(false);
    this.countdownExpired.set(false);
    this.winnerName.set("");

    this.api.send("progress", {
      roomId: this.roomId,
      testsPassed: 0,
      charCount: solutionLength(DEFAULT_SQL_EDITOR_CONTENT)
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
