import { Component, signal } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { IProblemSnippet, IProblemTitlesReceivedMessage } from '../../../../../backend/src/models';

@Component({
  selector: 'app-journey',
  imports: [BasicModule],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss'
})
export class JourneyComponent {
  problemTitles = signal<Array<IProblemSnippet>>([]);

  handlers: Handlers = {
    "getProblemTitlesReceived": this.handleProblemTitlesReceived.bind(this),
  };

  constructor(
    private api: ApiService
  ) {
    this.api.subscribe(this.handlers);
    this.api.send("getProblemTitles");
  }

  handleProblemTitlesReceived(msg: IProblemTitlesReceivedMessage) {
    this.problemTitles.set(msg.problemTitles);
  }
}
