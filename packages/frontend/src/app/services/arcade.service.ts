import { Injectable } from '@angular/core';

const LS_KEY = "arcade-state";

@Injectable({
  providedIn: 'root'
})
export class ArcadeService {

  constructor() { }

  getState(): Record<string, boolean> {
    const strState = localStorage.getItem(LS_KEY);
    if (strState) {
      return JSON.parse(strState);
    } else {
      return {};
    }
  }

  setState(state: Record<string, boolean>) {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }
}
