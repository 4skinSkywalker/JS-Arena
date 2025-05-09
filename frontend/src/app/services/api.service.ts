import { Injectable } from '@angular/core';
import { IClientJSON, IClientsListedMessage, IRoomJSON } from '../../../../backend/src/models';
import { BehaviorSubject } from 'rxjs';

export type Handlers  = Record<string, (msg: any) => void>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ready = false;
  ws = new WebSocket("ws://localhost:5000");
  rooms$ = new BehaviorSubject<IRoomJSON[]>([]);
  clients$ = new BehaviorSubject<IClientJSON[]>([]);

  tempMessages: { topic: string, message?: unknown }[] = [];
  handlers: Record<string, ((msg: any) => void)[]> = {
    "clientsListed": [this.handleClientListed.bind(this)],
  };

  constructor() {
    this.ws.onmessage = (message: unknown) => this.handleMessage(message);
    this.ws.onopen = () => this.handleOpen();
    this.ws.onclose = () => this.handleClose();
  }

  subscribe(topicHandler: Record<string, (msg: any) => void>) {
    for (const topic in topicHandler) {
      const handler = topicHandler[topic];
      if (!this.handlers[topic]) {
        this.handlers[topic] = [];
      }
      this.handlers[topic].push(handler);
    }
    return () => this.unsubscribe({ ...topicHandler });
  }

  unsubscribe(topicHandler: Record<string, (msg: any) => void>) {
    for (const topic in topicHandler) {
      const handler = topicHandler[topic];
      for (let i = this.handlers[topic].length - 1; i >= 0; i--) {
        if (this.handlers[topic][i] === handler) {
          this.handlers[topic].splice(i, 1);
        }
      }
    }
  }

  send(topic: string, message?: unknown) {
    if (!this.ready) {
      this.tempMessages.push({ topic, message });
      return console.warn("Not ready, the event will be sent as soon as it becomes ready.");
    }
    this.ws.send(JSON.stringify({ topic, message }));
  }

  handleClientListed(msg: IClientsListedMessage) {
    this.clients$.next(msg.clients);
  }

  handleMessage(event: any) {
    const { topic, message } = JSON.parse(event.data);
    console.log(topic, message);

    if (this.handlers[topic]) {
      for (const handler of this.handlers[topic]) {
        handler(message);
      }
    }
  }

  handleOpen() {
    this.ready = true;
    if (this.tempMessages.length) {
      for (const { topic, message } of this.tempMessages) {
        this.send(topic, message);
      }
      this.tempMessages = [];
    }
  }

  handleClose() {
    this.ready = false;
  }
}
