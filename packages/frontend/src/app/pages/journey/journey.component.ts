import { Component, computed, signal } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { IProblemSnippet, IProblemTitlesReceivedMessage } from '../../../../../backend/src/models';
import { ArcadeService } from '../../services/arcade.service';
import { check, delay, scrollElIntoView } from '../../shared/utils';
import { LoaderService } from '../../components/loader/loader-service.service';

@Component({
  selector: 'app-journey',
  imports: [BasicModule],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss'
})
export class JourneyComponent {
  check = check;
  problemTitles = signal<Array<IProblemSnippet>>([]);
  solvedProblems = computed(() => {
    const arcadeState = this.arcadeService.getState();
    return this.problemTitles().filter(p => arcadeState[p.filename]);
  });

  handlers: Handlers = {
    "getProblemTitlesReceived": this.handleProblemTitlesReceived.bind(this),
  };

  constructor(
    private api: ApiService,
    private arcadeService: ArcadeService,
    private loaderService: LoaderService,
  ) {
    this.api.subscribe(this.handlers);
    this.api.send("getProblemTitles");
    this.loaderService.isLoading.set(true);
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
    this.loaderService.isLoading.set(false);
  }

  async handleProblemTitlesReceived(msg: IProblemTitlesReceivedMessage) {
    this.problemTitles.set(msg.problemTitles);
    await delay(0.2);
    for (const key of Object.keys(this.arcadeService.getState())) {
      check(`#${key}`);
    }
    this.loaderService.isLoading.set(false);
    await delay(0.2);
    scrollElIntoView(`#${this.getLastKey()}`);
  }

  getLastKey() {
    const streaks: string[][] = [];
    let currStreak: string[] = [];
    const state = this.arcadeService.getState();
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
}
