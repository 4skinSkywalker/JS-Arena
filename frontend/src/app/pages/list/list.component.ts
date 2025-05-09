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
  check = check;
  uncheck = uncheck;
  openedRooms$;
  closedRooms$;
  filterByName = new FormControl("", { nonNullable: true });
  username = new FormControl("", { nonNullable: true });
  roomName = new FormControl("", { nonNullable: true });

  handlers: Handlers = {
    "clientsListed": console.warn,
    "roomsListed": console.warn,
  };

  constructor(public api: ApiService) {
    this.openedRooms$ = this.filterByName.valueChanges
      .pipe(
        startWith(""),
        switchMap((value: string) => {
          return this.api.rooms$.pipe(
            map(rooms =>
              rooms.filter(room => !room.started && room.name.toUpperCase().includes(value.toUpperCase()))
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
    this.api.send("listRooms");
  }

  ngOnDestroy() {
    this.api.unsubscribe(this.handlers);
  }

  sendClientInfo() {
    const clientInfo = loadFromLS("clientInfo");
    if (!clientInfo) {
      return check("#username-modal-trigger");
    }
    
    this.api.send("clientInfo", clientInfo);
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

  roomNameModalOk() {
    const roomName = latinize(this.roomName.value);
    if (!roomName) {
      return console.error("Username is empty");
    }

    const createRoom = { name: roomName };
    uncheck("#create-room-modal-trigger");
    this.api.send("createRoom", createRoom);
  }
}
