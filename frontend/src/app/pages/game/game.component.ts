import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';
import { check, debounce, deepCopy, delay, drag, equal, uncheck } from '../../../utils';
import { IChatReceivedMessage, IClientJSON, IClientWithRoomMessage, ILogMessage, IProgressReceivedMessage, IRoomDetailsReceivedMessage, IRoomJSON, IScore, ITest } from '../../../../../backend/src/models';
import { BasicModule } from '../../basic.module';
import { FormControl } from '@angular/forms';
import { MarkdownService } from '../../services/markdown.service';
import { LoaderService } from '../../components/loader/loader-service.service';
import { DEFAULT_EDITOR_CONTENT } from './game.constants';
import { BehaviorSubject } from 'rxjs';

export interface IClientWithScore extends IClientJSON, IScore {}

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
  editorContent = "";
  editorContentKey;
  navTab: "instructions" | "benchmark" = "instructions";
  consoleLogMessages: ILogMessage[] = [];
  chatMessages: IChatReceivedMessage[] = [];
  chatMessage = new FormControl("", { nonNullable: true });
  initializedRoom = false;
  alreadyStartedOnInit = false;
  room?: IRoomJSON;
  roomStarted = false;
  problemDescription = "";
  problemTests: ITest[] = [];
  countdown = 0;
  countdownRunning$ = new BehaviorSubject(false);
  countdownExpired = false;
  clientScoreMap: Record<string, IScore> = {};
  clientsSortByScore: IClientWithScore[] = [];
  clientsSortByCharCount: IClientWithScore[] = [];

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
      this.runCode(this.problemTests[0]?.input || null);
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
    this.api.send("joinRoom", { roomId: this.roomId });
    this.api.send("roomDetails", { roomId: this.roomId });
    this.loaderService.isLoading = true;
  }

  ngOnInit() {
    this.api.subscribe(this.handlers);
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

  isHost() {
    return this.room &&
      this.api.client$.value &&
      this.room?.host?.id === this.api.client$.value?.id;
  }

  hasGameStarted() {
    return this.alreadyStartedOnInit || (this.roomStarted && this.countdownExpired);
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
          console.log("Paste allowed content:", pasteObj.text);
          return pasteObj.text;
        } else {
          console.log("Paste forbidden content:", pasteObj.text);
          setTimeout(() => {
            aceEditor.setValue(content);
            aceEditor.clearSelection();
          }, 100);
          return "";
        }
    });

    aceEditor.getSession().on(
      "change",
      debounce(() => {
        const content = aceEditor.getSession().getValue();
        memory.push(content);
        if (memory.length > 10) {
          memory.shift();
        }
        this.onEditorValueChange(content);
      }, 500)
    );

    const lastEditorContent = localStorage.getItem(this.editorContentKey) || '';
    if (lastEditorContent) {
      aceEditor.setValue(lastEditorContent);
    } else {
      aceEditor.setValue(DEFAULT_EDITOR_CONTENT);
    }

    aceEditor.clearSelection();
  }

  onEditorValueChange(value: string) {
    console.log("Editor value changed", value);

    this.editorContent = value;
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
      text: args.map((arg: any) => {
        return (typeof arg === "string") 
          ? arg
          : JSON.stringify(arg);
      }).join(" ")
    };
  }

  consoleLog(level: "log" | "warn" | "error") {
    return (...args: any) => {
      this.consoleLogMessages.push(this.createLog(level, args));
      this.scrollToBottom(".console");
    };
  }

  async runCode(input: any, loggers?: { log?: () => void, warn?: () => void, error?: () => void }) {
    this.consoleLogMessages = [];
    await delay(0.1);

    (window as any).llog = !loggers?.log ? this.consoleLog("log") : loggers.log;
    (window as any).lwarn = !loggers?.warn ? this.consoleLog("warn") : loggers.warn;
    (window as any).lerror = !loggers?.error ? this.consoleLog("error") : loggers.error;

    const tamperedContent = this.editorContent
      .replace(/console\.log/g, "llog")
      .replace(/console\.warn/g, "lwarn")
      .replace(/console\.error/g, "lerror");
    
    let output;
    try {
      window.eval(tamperedContent);
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
    return test.status === "passed";
  }

  async runAllTests() {
    this.navTab = "benchmark";
    let testsPassed = 0;
    for (const test of this.problemTests) {
      if (await this.runSingleTest(test)) {
        testsPassed++;
      }
    }
    this.api.send("progress", { roomId: this.roomId, testsPassed });
  }

  generateSystemMessage(text: string) {
    const fakeClient = { id: "-1", name: "", rooms: [] };
    const fakeRoom = { id: "-1", name: "", started: false, host: fakeClient, clients: [] };
    this.chatMessages.push({
      id: "-1",
      room: fakeRoom,
      client: fakeClient,
      time: "00:00:00",
      text
    });
    this.scrollToBottom(".chat");
  }

  sendChatMessage(message: string) {
    this.api.send("chat", {
      roomId: this.roomId,
      text: message
    });
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
    this.countdownRunning$.next(true);
    const countdown = document.querySelector(".countdown");
    for (const num of [3, 2, 1]) {
      this.countdown = num;
      this.flickAnimation(countdown);
      this.generateSystemMessage(`Game starts in ${num} seconds`);
      await delay(1);
    }
    this.generateSystemMessage("Game started. Good luck!");
    this.countdownExpired = true;
    this.countdownRunning$.next(false);
  }

  startGame() {
    this.api.send("startGame", { roomId: this.roomId });
  }

  gameOver() {
    // TODO
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

  setClientArrays() {
    this.clientsSortByScore = [...(this.room?.clients || [])]
      .map(client => ({
        ...deepCopy(client),
        testsPassed: this.clientScoreMap[client.id]?.testsPassed,
        charCount: this.clientScoreMap[client.id]?.charCount
      }))
      .sort((a, b) => b.testsPassed - a.testsPassed);

    this.clientsSortByCharCount = [...(this.room?.clients || [])]
      .map(client => ({
        ...deepCopy(client),
        testsPassed: this.clientScoreMap[client.id]?.testsPassed,
        charCount: this.clientScoreMap[client.id]?.charCount
      }))
      .sort((a, b) => a.charCount - b.charCount);
  }

  handleChatReceived(msg: IChatReceivedMessage) {
    if (msg.room.id !== this.roomId) {
      return;
    }
    this.chatMessages.push(msg);
    this.scrollToBottom(".chat");
  }

  handleRoomDetailsReceived(msg: IRoomDetailsReceivedMessage) {
    if (msg.room.id !== this.roomId) {
      return;
    }

    this.room = msg.room;
    this.setClientArrays();

    if (!this.initializedRoom) {
      this.loaderService.isLoading = false;
      if (msg.room.started) {
        this.alreadyStartedOnInit = true;
        this.generateSystemMessage(`Game already started`);
      }
    }
    this.initializedRoom = true;

    if (msg.room.problem && !this.roomStarted) {
      this.roomStarted = msg.room.started;
      this.problemDescription = msg.room.problem.description;
      this.problemTests = msg.room.problem.tests;
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

  handleGameStarted() {
    this.aceEditor.setValue(DEFAULT_EDITOR_CONTENT);
    this.aceEditor.clearSelection();

    this.navTab = "instructions";
    
    this.consoleLogMessages = [];

    this.problemDescription = "";
    this.problemTests = [];

    this.alreadyStartedOnInit = false;
    this.roomStarted = false;
    this.countdownExpired = false;

    this.countdownAnimation();
  }

  handleProgressReceived(msg: IProgressReceivedMessage) {
    if (msg.room.id !== this.roomId) {
      return;
    }
    this.clientScoreMap[msg.client.id] = this.clientScoreMap[msg.client.id] || {};
    this.clientScoreMap[msg.client.id].testsPassed = msg.testsPassed ?? this.clientScoreMap[msg.client.id].testsPassed;
    this.clientScoreMap[msg.client.id].charCount = msg.charCount ?? this.clientScoreMap[msg.client.id].charCount;
    this.setClientArrays();
  }
}
