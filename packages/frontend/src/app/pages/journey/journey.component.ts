import { Component, signal } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { IProblemSnippet, IProblemTitlesReceivedMessage } from '../../../../../backend/src/models';
import { ArcadeService } from '../../services/arcade.service';
import { check, delay, scrollElIntoView } from '../../shared/utils';

@Component({
  selector: 'app-journey',
  imports: [BasicModule],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss'
})
export class JourneyComponent {
  check = check;
  problemTitles = signal<Array<IProblemSnippet>>([]);

  handlers: Handlers = {
    "getProblemTitlesReceived": this.handleProblemTitlesReceived.bind(this),
  };

  constructor(
    private api: ApiService,
    private arcadeService: ArcadeService,
  ) {
    this.api.subscribe(this.handlers);
    this.api.send("getProblemTitles");
  }

  async ngAfterViewInit() {
    await delay(0.2);
    const state = this.arcadeService.getState();
    let lastKey;
    for (const key of Object.keys(state)) {
      check(`#${key}`);
      lastKey = key;
    }
    scrollElIntoView(`#${lastKey}`);
  }

  handleProblemTitlesReceived(msg: IProblemTitlesReceivedMessage) {
    this.problemTitles.set(msg.problemTitles);
  }
}
