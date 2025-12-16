import { Component, computed, signal } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { EnumLang, IProblemSnippet, IProblemTitlesReceivedMessage } from '../../../../../backend/src/models';
import { ArcadeService } from '../../services/arcade.service';
import { check, delay, loadFile, saveFile, scrollElIntoView } from '../../shared/utils';
import { LoaderService } from '../../components/loader/loader-service.service';
import { ActivatedRoute } from '@angular/router';
import { LangiconComponent } from '../../components/langicon/langicon.component';

interface IProblemSnippetWithDoneAndFavorite extends IProblemSnippet {
  done: boolean;
  favorite: boolean;
}

@Component({
  selector: 'app-journey',
  imports: [BasicModule, LangiconComponent],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss'
})
export class JourneyComponent {
  check = check;
  problemTitles = signal<Array<IProblemSnippetWithDoneAndFavorite>>([]);
  solvedProblems = computed(() => {
    const arcadeState = this.arcadeService.getStates();
    return this.problemTitles().filter(p => arcadeState[p.filename]);
  });
  lang: EnumLang;
  
  handlers: Handlers = {
    "getProblemTitlesReceived": this.handleProblemTitlesReceived.bind(this),
  };

  constructor(
    private api: ApiService,
    private arcadeService: ArcadeService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.lang = (this.route.snapshot.data as { lang: EnumLang }).lang;
    this.api.subscribe(this.handlers);
    this.api.send("getProblemTitles", { lang: this.lang });
    this.loaderService.isLoading.set(true);
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
    this.loaderService.isLoading.set(false);
  }

  async handleProblemTitlesReceived(msg: IProblemTitlesReceivedMessage) {
    const states = this.arcadeService.getStates();
    const favorites = this.arcadeService.getFavorites();
    this.problemTitles.set(
      msg.problemTitles
        .map(p => ({
          ...p,
          done: states[p.filename],
          favorite: favorites[p.filename]
        }))
    );
    await delay(0.2);
    this.loaderService.isLoading.set(false);
    await delay(0.2);
    scrollElIntoView(`#id-${this.getLastKey()}`);
  }

  getLastKey() {
    const streaks: string[][] = [];
    let currStreak: string[] = [];
    const state = this.arcadeService.getStates();
    const nameAndDone = this.problemTitles().map(p => ({ name: p.filename, done: state[p.filename] }));

    for (const {name, done} of nameAndDone) {
      if (done) {
        currStreak.push(name);
      } else if (currStreak.length) {
        streaks.push(currStreak);
        currStreak = [];
      }
    }

    if (currStreak.length) {
      streaks.push(currStreak);
      currStreak = [];
    }

    return streaks.find(s => s.length === Math.max(...streaks.map(s => s.length)))?.pop();
  }

  favorite(p: IProblemSnippetWithDoneAndFavorite) {
    p.favorite = !p.favorite;
    const favorites = this.arcadeService.getFavorites();
    this.arcadeService.setFavorites({
      ...favorites,
      [p.filename]: p.favorite
    })
  }

  saveData() {
    saveFile(
      Object.entries(localStorage)
        .filter(([k, v]) => k.match(/^(arcade-state-favorite|arcade-editor-content|clientInfo|arcade-state)/)),
      `savedata_${(new Date().toLocaleDateString("sv"))}`,
      "jsar"
    );
  }

  async loadData() {
    const content = JSON.parse(await loadFile(["jsar"]) as string)
    localStorage.clear();
    content.forEach((tuple: [string, string]) => localStorage.setItem(tuple[0], tuple[1]));
    window.location.reload();
  }
}
