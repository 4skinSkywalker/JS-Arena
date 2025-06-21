import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';

@Component({
  selector: 'app-journey',
  imports: [BasicModule],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss'
})
export class JourneyComponent {
  handlers: Handlers = {
    "getProblemTitlesReceived": this.handleProblemTitlesReceived.bind(this),
  };

  constructor(
    private api: ApiService
  ) {
    this.api.subscribe(this.handlers);
    this.api.send("getProblemTitles");
  }

  handleProblemTitlesReceived(msg: any) {
    console.log(msg);
  }
}
