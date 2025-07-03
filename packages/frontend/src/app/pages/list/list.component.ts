import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { check, latinize, uncheck } from '../../shared/utils';
import { LoaderService } from '../../components/loader/loader-service.service';
import { Router } from '@angular/router';

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
  roomName = new FormControl("", { nonNullable: true });
  enableLateJoin = new FormControl(false, { nonNullable: true });

  handlers: Handlers = {};

  constructor(
    public api: ApiService,
    private loaderService: LoaderService,
    private router: Router
  ) {
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

    this.api.send("listRooms");
  }

  openCreateRoomModal() {
    check('#create-room-modal-trigger');

    const input = document.querySelector(".create-room-modal .form-control") as HTMLInputElement;
    input.value = "";
    setTimeout(() => input.focus(), 100);
    
    const keydownHandler = (evt: any) => {
      if (evt.key === "Enter") {
        evt.preventDefault();
        this.roomNameModalOk();
        input.removeEventListener("keydown", keydownHandler);
      }
    };
    input.addEventListener("keydown", keydownHandler);
  }

  roomNameModalOk() {
    const roomName = latinize(this.roomName.value);
    if (!roomName) {
      return console.error("Room name is empty");
    }

    const createRoom = { name: roomName, enableLateJoin: this.enableLateJoin.value };
    uncheck("#create-room-modal-trigger");

    this.api.one("roomCreated", async ({ room }) => {
      await this.router.navigate(["/multiplayer", room.id]);
      this.loaderService.isLoading.set(false);
    });

    this.api.send("createRoom", createRoom);
    this.loaderService.isLoading.set(true);
  }
}
