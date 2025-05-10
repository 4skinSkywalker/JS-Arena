import { Injectable } from '@angular/core';
import { IClientJSON, IClientsListedMessage, IRoomJSON, IRoomsListedMessage, IWhoAmIReceivedMessage } from '../../../../backend/src/models';
import { BehaviorSubject } from 'rxjs';

export type Handlers  = Record<string, (msg: any) => void>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ready = false;
  ws = new WebSocket("ws://localhost:5000");
  client$ = new BehaviorSubject<IClientJSON | null>(null);
  rooms$ = new BehaviorSubject<IRoomJSON[]>([]);
  clients$ = new BehaviorSubject<IClientJSON[]>([]);

  tempMessages: { topic: string, message?: any }[] = [];
  handlers: Record<string, ((msg: any) => void)[]> = {
    "whoAmIReceived": [this.handleWhoAmIReceived.bind(this)],
    "pong": [this.handlePong.bind(this)],
    "clientsListed": [this.handleClientListed.bind(this)],
    "roomsListed": [this.handleRoomsListed.bind(this)],
  };

  constructor() {
    this.ws.onmessage = (message: any) => this.handleMessage(message);
    this.ws.onopen = () => this.handleOpen();
    this.ws.onclose = () => this.handleClose();
    // this.send("ping"); TODO Should I send pings?
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

  on(topic: string, handler: (msg: any) => void) {
    return this.subscribe({ [topic]: handler });
  }

  one(topic: string, handler: (msg: any) => void) {
    const _handler = (msg: any) => {
      handler(msg);
      this.unsubscribe({ [topic]: _handler });
    };
    this.subscribe({ [topic]: _handler });
  }

  send(topic: string, message?: any) {
    if (!this.ready) {
      this.tempMessages.push({ topic, message });
      return console.warn("Not ready, the event will be sent as soon as it becomes ready.");
    }
    this.ws.send(JSON.stringify({ topic, message: JSON.stringify(message) }));
  }

  handleWhoAmIReceived(msg: IWhoAmIReceivedMessage) {
    console.log("Received client object", msg.client);
    this.client$.next(msg.client);
  }

  handlePong() {
    console.log("Pong received");
    setTimeout(() => this.send("ping"), 10000);
  }

  handleClientListed(msg: IClientsListedMessage) {
    this.clients$.next(msg.clients);
  }

  handleRoomsListed(msg: IRoomsListedMessage) {
    this.rooms$.next(msg.rooms);
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
