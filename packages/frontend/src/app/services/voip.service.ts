import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { IAudioMessage } from '../../../../backend/src/models';

@Injectable({
  providedIn: 'root',
})
export class VoipService {
  roomId: string | null = null;
  myClientId: string | null = null;
  context = new AudioContext();
  time = 0;

  constructor(
    private api: ApiService,
  ) {
    (window as any).voip = this;
    this.api.subscribe({
      "voiceReceived": this.handleVoiceReceived.bind(this),
    });
  }

  handleVoiceReceived(msg: IAudioMessage) {
    if (msg.roomId !== this.roomId || msg.data.length === 0) {
      return;
    }
    
    this.time = Math.max(this.context.currentTime, this.time);
    const buffer = this.context.createBuffer(1, msg.data.length, 16000);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = msg.data[i] / 32767;
    }
    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);
    source.start(this.time += buffer.duration);
  }

  initialize(roomId: string) {
    this.api.client$.subscribe(client => {
      if (client) {
        this.roomId = roomId;
        this.myClientId = client.id;
      }
    }); // TODO: Should unsubscribe to prevent memory leaks
  }

  async captureUserMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = this.context.createMediaStreamSource(stream);

    if (this.context.state === "suspended") {
      await this.context.resume();
    }

    await this.context.audioWorklet.addModule("/assets/downsample-processor.js");
    const processorNode = new AudioWorkletNode(this.context, "downsample-processor");
    processorNode.port.onmessage = event => {
      this.api.send("voice", {
        roomId: this.roomId,
        clientId: this.myClientId,
        data: event.data
      });
    };

    source.connect(processorNode).connect(this.context.destination);
  }
}
