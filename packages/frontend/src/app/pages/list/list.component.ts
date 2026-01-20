import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { check, getUid, latinize, uncheck } from '../../shared/utils';
import { LoaderService } from '../../components/loader/loader-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumLang } from '../../../../../backend/src/models';
import { LangiconComponent } from '../../components/langicon/langicon.component';

@Component({
  selector: 'app-list',
  imports: [BasicModule, LangiconComponent],
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
  enableLateJoin = new FormControl(true, { nonNullable: true });
  lang: EnumLang;
  roomCreatedSubscription?: () => void;

  handlers: Handlers = {};

  constructor(
    public api: ApiService,
    private loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.lang = (this.route.snapshot.data as { lang: EnumLang }).lang;

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

    this.api.send("listRooms", { lang: this.lang });
  }

  ngOnDestroy() {
    this.roomCreatedSubscription?.();
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

    uncheck("#create-room-modal-trigger");

    const createRoom = {
      roomId: getUid(),
      name: roomName,
      enableLateJoin: this.enableLateJoin.value,
      lang: this.lang
    };

    this.roomCreatedSubscription = this.api.on("roomCreated", async ({ room }) => {
      if (room.id !== createRoom.roomId) {
        return;
      }

      await this.router.navigate([`/${this.lang.toLowerCase()}-multiplayer`, room.id]);
      this.loaderService.isLoading.set(false);
      this.roomCreatedSubscription?.();
    });

    this.api.send("createRoom", createRoom);
    this.loaderService.isLoading.set(true);
  }
}
