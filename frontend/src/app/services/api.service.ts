import { Injectable } from '@angular/core';
import { IRoomJSON } from '../../../../backend/src/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  rooms$ = new BehaviorSubject<IRoomJSON[]>([]);

  constructor() {
    this.rooms$.next([
      {
        id: "1",
        name: "Test 1",
        started: false,
        host: "Anonymous",
        clients: []
      },
      {
        id: "2",
        name: "Test 2",
        started: false,
        host: "Anonymous",
        clients: []
      },
      {
        id: "3",
        name: "Test 3",
        started: true,
        host: "Anonymous",
        clients: []
      },
      {
        id: "4",
        name: "Test 4",
        started: true,
        host: "Anonymous",
        clients: []
      }
    ]);
  }
}
