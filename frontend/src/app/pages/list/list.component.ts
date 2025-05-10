import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService, Handlers } from '../../services/api.service';
import { map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { check, latinize, uncheck } from '../../../utils';
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

  handlers: Handlers = {};

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    public api: ApiService
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
  }

  roomNameModalOk() {
    const roomName = latinize(this.roomName.value);
    if (!roomName) {
      return console.error("Username is empty");
    }

    const createRoom = { name: roomName };
    uncheck("#create-room-modal-trigger");

    this.api.one("roomCreated", async ({ room }) => {
      await this.router.navigate(["/game", room.id]);
      this.loaderService.isLoading = false;
    });

    this.api.send("createRoom", createRoom);
    this.loaderService.isLoading = true;
  }
}
