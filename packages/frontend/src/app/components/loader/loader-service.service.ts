import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = signal(false);
  loadingMessage = signal("");
  
  constructor() { }
}
