import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';
import { debounce, delay } from '../../../utils';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  roomId;
  editorContentKey;

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
    this.initEditorResize();
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
    localStorage.setItem(this.editorContentKey, value);
  }

  drag(options: any) {
    let { target, downCb, moveCb, upCb, ctx, direction } = options;
    direction = direction || "x";
    ctx = ctx || {};
    target.addEventListener("mousedown", (mdevt: any) => {
      document.querySelectorAll("iframe").forEach(el => el.style.pointerEvents = "none");
      document.body.classList.add("moving");
      const mdpos = direction === "x" ? mdevt.clientX : mdevt.clientY;
      downCb && downCb(mdevt, ctx);

      const moveHandler = (mmevt: any) => {
        mmevt.preventDefault();
        const mmpos = direction === "x" ? mmevt.clientX : mmevt.clientY;
        ctx.pos = Math.round(mmpos - mdpos);
        moveCb && moveCb(mmevt, ctx);
      };
      document.addEventListener("mousemove", moveHandler);

      const upHandler = (muevt: any) => {
        document.querySelectorAll("iframe").forEach(el => el.style.pointerEvents = "initial");
        document.body.classList.remove("moving");
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
        upCb && upCb(muevt, ctx);
      };
      document.addEventListener("mouseup", upHandler);
    });
  }

  initEditorResize() {
    const editorContainer = document.querySelector(".editor-container") as HTMLDivElement;
    const editorWrap = document.querySelector(".editor-wrap");
    const consoleContainer = document.querySelector(".console-container");
    const consoleTitle = document.querySelector(".console-title");

    this.drag({
      target: consoleTitle,
      downCb: (evt: any, ctx: any) => {
        // console.log("Mouse down", evt);
        ctx.editorWrapHeight = editorWrap?.clientHeight;
        ctx.consoleContainerHeight = consoleContainer?.clientHeight;
      },
      moveCb: (evt: any, ctx: any) => {
        // console.log("Mouse move", evt);
        const editorWrapHeight = ctx.editorWrapHeight + ctx.pos;
        const consoleContainerHeight = ctx.consoleContainerHeight - ctx.pos;
        if (editorContainer) {
          editorContainer.style.gridTemplateRows = `${editorWrapHeight}px ${consoleContainerHeight}px`;
        }
      },
      direction: "y"
    });
  }
}
