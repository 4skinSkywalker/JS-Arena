import { Injectable } from '@angular/core';
import { IClientJSON, IClientsListedMessage, IRoomJSON, IRoomsListedMessage, IWhoAmIReceivedMessage } from '../../../../backend/src/models';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../components/loader/loader-service.service';
import { saveIntoLS } from '../shared/utils';

export type Handlers  = Record<string, (msg: any) => void>;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  ready = false;
  ws: WebSocket | null = null;
  client$ = new BehaviorSubject<IClientJSON | null>(null);
  rooms$ = new BehaviorSubject<IRoomJSON[]>([]);
  clients$ = new BehaviorSubject<IClientJSON[]>([]);

  tempMessages: { topic: string, message?: any }[] = [];
  handlers: Record<string, ((msg: any) => void)[]> = {
    "whoAmIReceived": [this.handleWhoAmIReceived.bind(this)],
    "pong": [this.handlePong.bind(this)],
    "clientsListed": [this.handleClientListed.bind(this)],
    "roomsListed": [this.handleRoomsListed.bind(this)],
    "roomSecret": [this.handleRoomSecret.bind(this)],
  };

  constructor(
    private loaderService: LoaderService,
  ) {
    this.connectWebSocket();
  }

  connectWebSocket() {
    this.loaderService.isLoading.set(true);

    // this.ws = new WebSocket("ws://localhost:5000");
    this.ws = new WebSocket("wss://js-arena-a762750b0e8d.herokuapp.com");

    this.ws.addEventListener("open", () => {
      this.ready = true;

      if (this.tempMessages.length) {
        for (const { topic, message } of this.tempMessages) {
          this.send(topic, message);
        }
        this.tempMessages = [];
      }

      this.send("ping"); // Keep alive

      this.loaderService.loadingMessage.set("");
      this.loaderService.isLoading.set(false);
    });

    this.ws.addEventListener("message", (message: any) => {
      this.handleMessage(message);
    });

    this.ws.addEventListener("close", () => {
      this.ready = false;
      this.retryConnection();
    });

    this.ws.addEventListener("error", () => {
      this.loaderService.loadingMessage.set("The server is lazy and is coming up. You'll get connected soon.");
      this.loaderService.isLoading.set(true);

      this.ws!.close(); // Ensure the socket is closed
    });
  }

  retryConnection() {
    setTimeout(() => this.connectWebSocket(), 3000); // Retry after 3 second
  }

  subscribe(topicHandler: Record<string, (msg: any) => void>) {
    for (const topic in topicHandler) {
      const handler = topicHandler[topic];
      if (!this.handlers[topic]) {
        this.handlers[topic] = [];
      }
      console.log("Subscribing", topic);
      this.handlers[topic].push(handler);
    }
    return () => this.unsubscribe({ ...topicHandler });
  }

  unsubscribe(topicHandler: Record<string, (msg: any) => void>) {
    for (const topic in topicHandler) {
      const handler = topicHandler[topic];
      for (let i = this.handlers[topic].length - 1; i >= 0; i--) {
        if (this.handlers[topic][i] === handler) {
          console.log("Unsubscribing", topic);
          this.handlers[topic].splice(i, 1);
        }
      }
    }
  }

  on(topic: string, handler: (msg: any) => void = (() => {})) {
    return this.subscribe({ [topic]: handler });
  }

  one(topic: string, handler: (msg: any) => void = (() => {})) {
    const _handler = (msg: any) => {
      handler(msg);
      this.unsubscribe({ [topic]: _handler });
    };
    return this.subscribe({ [topic]: _handler });
  }

  send(topic: string, message?: any) {
    if (!this.ws || !this.ready) {
      this.tempMessages.push({ topic, message });
      return console.warn("Not ready, the event will be sent as soon as it becomes ready.");
    }
    this.ws.send(JSON.stringify({ topic, message: JSON.stringify(message) }));
  }

  handleWhoAmIReceived(msg: IWhoAmIReceivedMessage) {
    // console.log("Received client object", msg.client);
    this.client$.next(msg.client);
  }

  handlePong() {
    // console.log("Pong received");
    setTimeout(() => this.send("ping"), 7500);
  }

  handleClientListed(msg: IClientsListedMessage) {
    this.clients$.next(msg.clients);
  }

  handleRoomsListed(msg: IRoomsListedMessage) {
    this.rooms$.next(msg.rooms);
  }

  handleRoomSecret(msg: { secret: string }) {
    saveIntoLS("roomSecret", msg.secret);
  }

  handleMessage(event: any) {
    const { topic, message } = JSON.parse(event.data);
    // console.log(topic, message);

    if (this.handlers[topic]) {
      for (const handler of this.handlers[topic]) {
        handler(message);
      }
    }
  }
}
