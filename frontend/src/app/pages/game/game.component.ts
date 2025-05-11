import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';
import { debounce, delay, drag } from '../../../utils';
import { IChatReceivedMessage } from '../../../../../backend/src/models';
import { BasicModule } from '../../basic.module';

interface IConsoleLogMessage {
  level: "log" | "warn" | "error";
  timestamp: number;
  text: string;
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
  chatMessages: IChatReceivedMessage[] = [
    { 
      id: "123",
      room: {
        id: "123", 
        name: "Lobby", 
        started: true, 
        host: { 
          id: "123", 
          name: "Steve", 
          rooms: [] 
        }, 
        clients: []
      },
      client: {
        id: "123", 
        name: "Steve", 
        rooms: []
      },
      time: "12:00", 
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, quaerat!"
    },
    { 
      id: "234",
      room: {
        id: "123", 
        name: "Lobby", 
        started: true, 
        host: { 
          id: "123", 
          name: "Steve", 
          rooms: [] 
        }, 
        clients: []
      },
      client: {
        id: "123", 
        name: "Steve", 
        rooms: []
      },
      time: "12:00", 
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, quaerat!"
    },
    { 
      id: "345",
      room: {
        id: "123", 
        name: "Lobby", 
        started: true, 
        host: { 
          id: "123", 
          name: "Steve", 
          rooms: [] 
        }, 
        clients: []
      },
      client: {
        id: "123", 
        name: "Steve", 
        rooms: []
      },
      time: "12:00", 
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod, quaerat!"
    },
  ];

  handlers: Handlers = {};

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

  scrollToBottom(selector: string) {
    const el = document.querySelector(selector) as HTMLDivElement;
    el.scrollTop = el.scrollHeight;
  }

  consoleLog(level: "log" | "warn" | "error") {
    return (...args: any) => {
      this.consoleLogMessages.push({
        level,
        timestamp: new Date().getTime(),
        text: args.map((arg: any) => {
          return (typeof arg === "string") 
            ? arg
            : JSON.stringify(arg);
        }).join(" ")
      });
      
      setTimeout(() => this.scrollToBottom(".console"), 200);
    };
  }

  runCode() {
    this.consoleLogMessages = [];
    (window as any).llog = this.consoleLog("log");
    (window as any).lwarn = this.consoleLog("warn");
    (window as any).lerror = this.consoleLog("error");
    const tamperedContent = this.editorContent
      .replace(/console\.log/g, "llog")
      .replace(/console\.warn/g, "lwarn")
      .replace(/console\.error/g, "lerror");
    window.eval(tamperedContent);
  }
}
