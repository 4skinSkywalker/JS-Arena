import { Injectable } from '@angular/core';

const LS_KEY = "arcade-state";

@Injectable({
  providedIn: 'root'
})
export class ArcadeService {

  constructor() { }

  getStates(): Record<string, boolean> {
    const val = localStorage.getItem(LS_KEY);
    if (val) {
      return JSON.parse(val);
    } else {
      return {};
    }
  }
  setStates(val: Record<string, boolean>) {
    localStorage.setItem(LS_KEY, JSON.stringify(val));
  }

  getFavorites(): Record<string, boolean> {
    const val = localStorage.getItem(LS_KEY + "-favorite");
    if (val) {
      return JSON.parse(val);
    } else {
      return {};
    }
  }
  setFavorites(val: Record<string, boolean>) {
    localStorage.setItem(LS_KEY + "-favorite", JSON.stringify(val));
  }
}
