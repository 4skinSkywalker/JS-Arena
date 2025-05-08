import { Component } from '@angular/core';
import { BasicModule } from '../../basic.module';
import { ApiService } from '../../services/api.service';
import { map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

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

  constructor(private api: ApiService) {
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
}
