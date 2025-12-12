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
  navTab = signal<"instructions" | "benchmark">("instructions");

  testsRunning = signal(false);
  testsPassed = signal(0);
  problemFilename = signal<string>("");
  problemDescription = signal("");
  problemTitle = signal("");
  problemRating = signal("");
  problemTests = signal<ITest[]>([]);
  problemSolved = signal(false);
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

    console.log({ execResult: await this.db.exec(test.scripts?.join("\n") || "") });
    let received;
    try {
      received = (await this.db.query(this.editorContent())).rows;
      console.log({ results: received });
    } catch (e: any) {
      if (e?.message) {
        test.logs?.push({ level: "error", text: e.message });
      }
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
    this.problemTitle.set(msg.problem.title);
    this.problemRating.set(String(msg.problem.rating));
    this.problemTests.set(msg.problem.tests);
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

  goToNextProblem() {
    uncheck("#challenge-completed-trigger");
    clearInterval(this.matrixInterval);
    this.resetGame();
    this.api.send("getProblem", {
      lang: EnumLang.SQL,
      filename: this.nextProblemFilename()
    });
  }

  resetGame() {
    this.problemSolved.set(false);
    this.testsPassed.set(0);
    this.setDefaultEditorContent();
    this.navTab.set("instructions");
    this.problemDescription.set("");
    this.problemTitle.set("");
    this.problemRating.set("");
    this.problemTests.set([]);
  }
}
