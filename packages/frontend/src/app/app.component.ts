import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { FormControl } from '@angular/forms';
import { ApiService, Handlers } from './services/api.service';
import { check, latinize, loadFromLS, saveIntoLS, uncheck } from '../utils';
import { BasicModule } from './basic.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BasicModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'js-arena';
  username = new FormControl("", { nonNullable: true });

  handlers: Handlers = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.subscribe(this.handlers);
  }

  ngAfterViewInit() {
    this.sendClientInfo();
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
  }

  sendClientInfo() {
    const clientInfo = loadFromLS("clientInfo");
    if (!clientInfo) {
      return this.openUsernameModal();
    }

    this.api.send("clientInfo", clientInfo);
  }

  openUsernameModal() {
    check("#username-modal-trigger");

    const input = document.querySelector(".username-modal .form-control") as HTMLInputElement;
    input.value = "";
    setTimeout(() => input.focus(), 100);
    
    const keydownHandler = (evt: any) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        this.usernameModalOk();
        input.removeEventListener("keydown", keydownHandler);
      }
    };
    input.addEventListener("keydown", keydownHandler);
  }

  usernameModalOk() {
    const username = latinize(this.username.value);
    if (!username) {
      return console.error("Username is empty");
    }

    const clientInfo = { name: username };
    uncheck("#username-modal-trigger");
    saveIntoLS("clientInfo", clientInfo);
    this.api.send("clientInfo", clientInfo);
  }
}
