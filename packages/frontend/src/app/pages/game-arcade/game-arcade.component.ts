import { Component, HostListener, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';
import { focus, check, debounce, delay, drag, equal, matrixRain, uncheck } from '../../shared/utils';
import { IGetProblemReceivedMessage, ILogMessage, ITest } from '../../../../../backend/src/models';
import { BasicModule } from '../../basic.module';
import { FormControl } from '@angular/forms';
import { MarkdownService } from '../../services/markdown.service';
import { LoaderService } from '../../components/loader/loader-service.service';
import { DEFAULT_EDITOR_CONTENT, getExecutableStr, ILoggerMethods } from '../../shared/game.const';
import { ArcadeService } from '../../services/arcade.service';

@Component({
  selector: 'app-game-arcade',
  imports: [BasicModule],
  templateUrl: './game-arcade.component.html',
  styleUrl: './game-arcade.component.scss'
})
export class GameArcadeComponent {
  DEFAULT_EDITOR_CONTENT = DEFAULT_EDITOR_CONTENT;
  JSON = JSON;
  check = check;
  uncheck = uncheck;
  editor: any;
  editorContentKey;
  editorContent = signal("");
  navTab = signal<"instructions" | "benchmark">("instructions");
  consoleLogMessages = signal<ILogMessage[]>([]);
  consoleEval = new FormControl("", { nonNullable: true });
  exprHistory: string[] = [];
  exprHistoryIndex = 0;

  testsRunning = signal(false);
  testsPassed = signal(0);
  problemFilename = signal<string>("");
  problemDescription = signal("");
  problemTests = signal<ITest[]>([]);
  nextProblemFilename = signal<string | undefined | null>(null);
  matrixInterval: any;

  handlers: Handlers = {
    "getProblemReceived": this.handleGetProblemReceived.bind(this),
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
    private arcadeService: ArcadeService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
  ) {
    this.problemFilename.set(this.route.snapshot.paramMap.get("id")!);
    this.editorContentKey = `arcade-editor-content-${this.problemFilename()}`;
  }

  ngOnInit() {
    (window as any).game = this;
    this.api.subscribe(this.handlers);
    this.loaderService.isLoading.set(true);
  }

  async ngAfterViewInit() {
    await delay(0.2);
    this.initEditor();
    this.initGameResize();
    this.initEditorResize();
    this.api.send("getProblem", { filename: this.problemFilename() });
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
    this.loaderService.isLoading.set(false);
    clearInterval(this.matrixInterval);
  }

  updateUrl(newId: string) {
    const segments = this.route.snapshot.url.map(s => s.path);
    segments[segments.length - 1] = newId;
    this.location.replaceState("/" + segments.join("/"));
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
  }

  setDefaultEditorContent() {
    const lastEditorContent = localStorage.getItem(this.editorContentKey) || '';
    if (lastEditorContent) {
      this.editor.setValue(lastEditorContent);
    } else {
      this.editor.setValue(DEFAULT_EDITOR_CONTENT);
    }
    this.editor.clearSelection();
  }

  initEditor() {
    const ace = (window as any).ace;
    ace.require("ace/ext/language_tools");
    ace.require("ace/ext/emmet").setCore("ext/emmet_core");
    ace.config.loadModule("ace/snippets/javascript", () =>
      console.log("JS snippets loaded.")
    );

    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableEmmet: true,
    });

    this.editor.getSession().setUseWorker(false);
    this.editor.getSession().setMode("ace/mode/javascript");

    this.editor.getSession().on("change", debounce(() => {
      const editorValue = this.editor.getSession().getValue();
      this.onEditorValueChange(editorValue);
    }, 500));

    this.setDefaultEditorContent();
  }

  initGameResize() {
    const gameContainer = document.querySelector(".game-container") as HTMLDivElement;
    const editorContainer = document.querySelector(".editor-container");
    const contentContainer = document.querySelector(".instructions");
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
    const w = new Worker(new URL("../../shared/w.js", import.meta.url));
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
    
    if (testsPassed === this.problemTests().length) {
      // Save state into local storage
      const state = this.arcadeService.getState();
      state[this.problemFilename()] = true;
      this.arcadeService.setState(state);

      if (this.nextProblemFilename()) {
        this.challengeCompleted();
      } else {
        this.journeyEnd();
      }
    }

    this.testsPassed.set(testsPassed);
    this.testsRunning.set(false);
  }

  async flickAnimation(el: Element | null) {
    if (el) {
      el.classList.remove("animation");
      await delay(0.1);
      el.classList.add("animation");
    }
  }

  handleGetProblemReceived(msg: IGetProblemReceivedMessage) {
    this.problemFilename.set(msg.problem.filename);
    this.problemDescription.set(msg.problem.description);
    this.problemTests.set(msg.problem.tests);
    this.nextProblemFilename.set(msg.problem.nextProblemFilename);
    this.updateUrl(this.problemFilename());
    this.editorContentKey = `arcade-editor-content-${this.problemFilename()}`;
    this.setDefaultEditorContent();
    this.loaderService.isLoading.set(false);
  }

  challengeCompleted() {
    check("#challenge-completed-trigger");
    focus(".challenge-completed-modal button.btn-primary");
    this.matrixInterval = matrixRain("#matrix-canvas");
  }

  backToJourney() {
    clearInterval(this.matrixInterval);
    this.router.navigate(['/journey']);
  }

  journeyEnd() {
    check("#journey-end-trigger");
    focus(".journey-end-modal button.btn-primary");
    this.matrixInterval = matrixRain("#matrix-canvas");
  }

  goToNextProblem() {
    uncheck("#challenge-completed-trigger");
    clearInterval(this.matrixInterval);
    this.resetGame();
    this.api.send("getProblem", { filename: this.nextProblemFilename() });
  }

  resetGame() {
    this.setDefaultEditorContent();
    this.navTab.set("instructions");
    this.consoleLogMessages.set([]);
    this.problemDescription.set("");
    this.problemTests.set([]);
  }
}
