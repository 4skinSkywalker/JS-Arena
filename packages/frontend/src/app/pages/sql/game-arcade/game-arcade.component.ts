import { Component, HostListener, signal } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Handlers } from '../../../services/api.service';
import { focus, check, debounce, delay, drag, equal, matrixRain, uncheck } from '../../../shared/utils';
import { EnumLang, IGetProblemReceivedMessage, ITest } from '../../../../../../backend/src/models';
import { BasicModule } from '../../../basic.module';
import { MarkdownService } from '../../../services/markdown.service';
import { LoaderService } from '../../../components/loader/loader-service.service';
import { DEFAULT_SQL_EDITOR_CONTENT } from '../../../shared/game.const';
import { ArcadeService } from '../../../services/arcade.service';
import { DBService } from '../../../services/db.service';

const SOLUTION_COUNTDOWN_TIME = 300;

@Component({
  selector: 'app-sql-game-arcade',
  imports: [BasicModule],
  templateUrl: './game-arcade.component.html',
  styleUrl: './game-arcade.component.scss'
})
export class SQLGameArcadeComponent {
  Object = Object;
  DEFAULT_EDITOR_CONTENT = DEFAULT_SQL_EDITOR_CONTENT;
  JSON = JSON;
  check = check;
  uncheck = uncheck;
  editor: any;
  editorContentKey;
  editorContent = signal("");
  solutionEditor: any;
  navTab = signal<"instructions" | "benchmark" | "solution">("instructions");

  testsRunning = signal(false);
  testsPassed = signal(0);
  problemFilename = signal<string>("");
  problemDescription = signal("");
  revealSolutionCountdown: ReturnType<typeof setInterval> | null = null;
  problemSolutionUnlockCountdown = signal("--");
  bypassSolutionLock = signal(false);
  problemTitle = signal("");
  problemRating = signal("");
  problemTests = signal<ITest[]>([]);
  problemSolved = signal(false);
  prevProblemFilename = signal<string | undefined | null>(null);
  nextProblemFilename = signal<string | undefined | null>(null);
  matrixInterval: any;

  handlers: Handlers = {
    "getProblemReceived": this.handleGetProblemReceived.bind(this),
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
    private arcadeService: ArcadeService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private db: DBService,
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
    this.initSolutionEditor();
    this.initGameResize();
    this.api.send("getProblem", {
      lang: EnumLang.SQL,
      filename: this.problemFilename()
    });
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

  onEditorValueChange(value: string) {
    this.editorContent.set(value);
    localStorage.setItem(this.editorContentKey, value);
  }

  setDefaultEditorContent() {
    const lastEditorContent = localStorage.getItem(this.editorContentKey) || '';
    if (lastEditorContent) {
      this.editor.setValue(lastEditorContent);
    } else {
      this.editor.setValue(DEFAULT_SQL_EDITOR_CONTENT);
    }
    this.editor.clearSelection();
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

    this.editor.getSession().on("change", debounce(() => {
      const editorValue = this.editor.getSession().getValue();
      this.onEditorValueChange(editorValue);
    }, 500));

    this.setDefaultEditorContent();
  }

  clearRevealSolutionCountdown() {
    if (this.revealSolutionCountdown) {
      clearInterval(this.revealSolutionCountdown);
    }
  }

  startProblemSolutionUnlockCountdown() {
    const setTimeLabel = (sec: number) => {
      if (sec <= 0) {
        return this.problemSolutionUnlockCountdown.set("");
      }

      const minutes = Math.ceil(sec / 60);
      this.problemSolutionUnlockCountdown.set(`(${minutes} ${minutes > 1 ? "minutes" : "minute"})`);
    };

    let countdown = SOLUTION_COUNTDOWN_TIME;
    setTimeLabel(countdown);

    this.revealSolutionCountdown = setInterval(() => {
      countdown--;
      if (countdown < 0) {
        return this.clearRevealSolutionCountdown();
      }

      setTimeLabel(countdown);
    }, 1000);
  }

  forceSolutionEditorRefresh() {
    setTimeout(() => this.solutionEditor.resize(), 25);
  }

  setSolutionEditorContent(content: string) {
    this.solutionEditor.setValue(`--This is the author's solution to this SQL challenge\n${content}`);
    this.solutionEditor.clearSelection();
    this.forceSolutionEditorRefresh();
    this.startProblemSolutionUnlockCountdown();
  }

  initSolutionEditor() {
    const ace = (window as any).ace;
    
    this.solutionEditor = ace.edit("solution-editor");
    this.solutionEditor.setTheme("ace/theme/monokai");
    this.solutionEditor.setShowPrintMargin(false);
    this.solutionEditor.setReadOnly(true);

    this.solutionEditor.getSession().setUseWorker(false);
    this.solutionEditor.getSession().setMode("ace/mode/sql");
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
    
    if (testsPassed === this.problemTests().length) {
      // Save state into local storage
      const state = this.arcadeService.getStates();
      state[this.problemFilename()] = true;
      this.arcadeService.setStates(state);
      
      if (this.nextProblemFilename()) {
        this.challengeCompleted();
      } else {
        this.journeyEnd();
      }

      this.problemSolved.set(true);
    }
    
    this.testsPassed.set(testsPassed);
    this.testsRunning.set(false);
    this.bypassSolutionLock.set(true);
  }

  async flickAnimation(el: Element | null) {
    if (el) {
      el.classList.remove("animation");
      await delay(0.1);
      el.classList.add("animation");
    }
  }

  handleGetProblemReceived(msg: IGetProblemReceivedMessage) {
    console.log({ msg })
    this.problemFilename.set(msg.problem.filename);
    this.problemDescription.set(msg.problem.description);
    this.setSolutionEditorContent(msg.problem.solution);
    this.problemTitle.set(msg.problem.title);
    this.problemRating.set(String(msg.problem.rating));
    this.problemTests.set(msg.problem.tests);
    this.prevProblemFilename.set(msg.problem.prevProblemFilename);
    this.nextProblemFilename.set(msg.problem.nextProblemFilename);
    this.updateUrl(this.problemFilename());
    this.editorContentKey = `arcade-editor-content-${this.problemFilename()}`;
    this.setDefaultEditorContent();
    this.loaderService.isLoading.set(false);
  }

  challengeCompleted() {
    if (this.problemSolved()) {
      return;
    }

    check("#challenge-completed-trigger");
    focus(".challenge-completed-modal button.btn-primary");
    this.matrixInterval = matrixRain("#matrix-canvas");
  }

  journeyEnd() {
    if (this.problemSolved()) {
      return;
    }
    
    check("#journey-end-trigger");
    focus(".journey-end-modal button.btn-primary");
    this.matrixInterval = matrixRain("#matrix-canvas");
  }

  backToJourney() {
    clearInterval(this.matrixInterval);
    this.router.navigate(['/sql-arcade']);
  }

  goToProblem(which: "previous" | "next") {
    uncheck("#challenge-completed-trigger");
    clearInterval(this.matrixInterval);
    this.resetGame();
    this.api.send("getProblem", {
      lang: EnumLang.SQL,
      filename: (which === "previous")
        ? this.prevProblemFilename()
        : this.nextProblemFilename()
    });
  }

  resetGame() {
    this.problemSolved.set(false);
    this.testsPassed.set(0);
    this.bypassSolutionLock.set(false);
    this.clearRevealSolutionCountdown();
    this.setDefaultEditorContent();
    this.navTab.set("instructions");
    this.problemDescription.set("");
    this.problemTitle.set("");
    this.problemRating.set("");
    this.problemTests.set([]);
  }
}
