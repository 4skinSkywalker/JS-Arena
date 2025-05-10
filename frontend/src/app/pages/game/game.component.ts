import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, Handlers } from '../../services/api.service';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  roomId;

  handlers: Handlers = {};

  constructor(
    private route: ActivatedRoute,
    public api: ApiService
  ) {
    this.roomId = this.route.snapshot.paramMap.get("id");
    this.api.send("joinRoom", { roomId: this.roomId });
  }

  ngOnInit() {
    this.api.subscribe(this.handlers);
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
  }
}
