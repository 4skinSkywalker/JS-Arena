import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { check, latinize, loadFromLS, saveIntoLS, uncheck } from '../../../utils';

@Component({
  selector: 'app-list',
  imports: [BasicModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  openedRooms$;
  closedRooms$;
  filterByName = new FormControl("", { nonNullable: true });
  username = new FormControl("", { nonNullable: true });

  handlers: Handlers = {
    "clientsListed": console.warn,
  };

  constructor(public api: ApiService) {
    this.openedRooms$ = this.filterByName.valueChanges
      .pipe(
        startWith(""),
        switchMap((value: string) => {
          return this.api.rooms$.pipe(
            map(rooms =>
              rooms.filter(room => 
                !room.started &&
                room.name.toUpperCase().includes(value.toUpperCase())
              )
            )
          );
        })
      );

    this.closedRooms$ = this.api.rooms$
      .pipe(
        map(rooms =>
          rooms.filter(room => room.started)
        )
      );
  }

  ngOnInit() {
    this.api.subscribe(this.handlers);
    this.sendClientInfo();
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
  }

  sendClientInfo() {
    const clientInfo = loadFromLS("clientInfo");
    if (!clientInfo) {
      return check("#modal-trigger");
    }
    this.api.send("clientInfo", clientInfo);
  }

  usernameModalOk() {
    const username = latinize(this.username.value);
    if (!username) {
      return console.error("Username is empty");
    }
    const clientInfo = { name: username };
    uncheck("#modal-trigger");
    saveIntoLS("clientInfo", JSON.stringify(clientInfo));
    this.api.send("clientInfo", clientInfo);
  }
}
