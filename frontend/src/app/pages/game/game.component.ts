import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';
import { debounce, delay, drag, equal } from '../../../utils';
import { IChatReceivedMessage } from '../../../../../backend/src/models';
import { BasicModule } from '../../basic.module';
import { FormControl } from '@angular/forms';

interface IConsoleLogMessage {
  level: "log" | "warn" | "error";
  text: string;
}

interface ITest {
  status: "pending" | "running" | "passed" | "failed";
  input: any;
  expectedOutput: any;
  output: any;
  logs: IConsoleLogMessage[];
}

@Component({
  selector: 'app-game',
  imports: [BasicModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  roomId;
  editorContent = "";
  editorContentKey;
  navTab: "instructions" | "benchmark" = "instructions";
  consoleLogMessages: IConsoleLogMessage[] = [];
  chatMessages: IChatReceivedMessage[] = [];
  chatMessage = new FormControl("", { nonNullable: true });
  tests: ITest[] = [
    {
      status: "failed",
      input: [1, 2, 3, 4],
      expectedOutput: 10,
      output: 9,
      logs: [
        { level: "log", text: "Sum is 15" }
      ]
    },
    {
      status: "passed",
      input: [1, 2, 3, 4, 5],
      expectedOutput: 15,
      output: 9,
      logs: [
        { level: "log", text: "Sum is 15" }
      ]
    },
    {
      status: "pending",
      input: [1, 2],
      expectedOutput: 3,
      output: null,
      logs: []
    }
  ];

  handlers: Handlers = {
    "chatReceived": this.handleChatReceived.bind(this)
  };

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "Enter") {
      this.runAllTests();
    }
  }

  constructor(
    private route: ActivatedRoute,
    public api: ApiService
  ) {
    this.roomId = this.route.snapshot.paramMap.get("id");
    this.editorContentKey = `editor-content-${this.roomId}`;
    this.api.send("joinRoom", { roomId: this.roomId });
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

  initEditor() {
    const ace = (window as any).ace;
    console.log("Initializing editor", ace);
    const aceEditor = ace.edit("editor");
    aceEditor.setTheme("ace/theme/monokai");

    ace.require("ace/ext/emmet").setCore("ext/emmet_core");
    ace.config.loadModule("ace/snippets/javascript", () => console.log("JS snippets loaded."));

    aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableEmmet: true,
    });

    aceEditor.getSession().setUseWorker(false);
    aceEditor.getSession().setMode("ace/mode/javascript");

    aceEditor.getSession().on("change", debounce(() => {
      this.onEditorValueChange(aceEditor.getSession().getValue());
    }, 500));

    const lastEditorContent = localStorage.getItem(this.editorContentKey) || "";
    if (lastEditorContent) {
      aceEditor.setValue(lastEditorContent);
    } else {
      aceEditor.setValue(`function solution() {}`);
    }

    aceEditor.clearSelection();
  }

  onEditorValueChange(value: string) {
    console.log("Editor value changed", value);
    this.editorContent = value;
    localStorage.setItem(this.editorContentKey, value);
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
    window.eval(tamperedContent);
    return (window as any).solution && (window as any).solution(input);
  }

  async runSingleTest(test: ITest) {
    test.output = null;
    test.logs = [];
    test.status = "running";

    await delay(0.2);
    const output = await this.runCode(test.input, {
      log: (...args: any) => test.logs.push(this.createLog("log", args)),
      warn: (...args: any) => test.logs.push(this.createLog("warn", args)),
      error: (...args: any) => test.logs.push(this.createLog("error", args))
    });

    if (equal(output, test.expectedOutput)) {
      test.status = "passed";
    } else {
      test.status = "failed";
    }

    test.output = output;
  }

  async runAllTests() {
    this.tests.forEach(test => this.runSingleTest(test));
  }

  handleChatReceived(msg: IChatReceivedMessage) {
    this.chatMessages.push(msg);
    this.scrollToBottom(".chat");
  }

  sendChatMessage(message: string) {
    this.api.send("chat", {
      roomId: this.roomId,
      text: message
    });
    this.chatMessage.setValue("");
  }
}
