import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { IAudioMessage } from '../../../../backend/src/models';
import { skipWhile, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoipService {
  roomId: string | null = null;
  myClientId: string | null = null;

  stream: MediaStream | null = null;
  source: MediaStreamAudioSourceNode | null = null;
  processorNode: AudioWorkletNode | null = null;
  context = new AudioContext();
  calling = signal(false);
  time = 0;

  constructor(
    private api: ApiService,
  ) {
    this.api.subscribe({
      "voiceReceived": this.handleVoiceReceived.bind(this),
    });
  }

  handleVoiceReceived(msg: IAudioMessage) {
    if (msg.roomId !== this.roomId || msg.data.length === 0 || !this.calling) {
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
    this.roomId = roomId;
    this.api.client$
      .pipe(
        skipWhile(client => !client),
        take(1)
      )
      .subscribe(client => {
        this.myClientId = client!.id;
      });
  }

  async startCall() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.source = this.context.createMediaStreamSource(this.stream);

    if (this.context.state === "suspended") {
      await this.context.resume();
    }

    await this.context.audioWorklet.addModule("/assets/downsample-processor.js");
    this.processorNode = new AudioWorkletNode(this.context, "downsample-processor");

    this.processorNode.port.onmessage = event => {
      this.api.send("voice", {
        roomId: this.roomId,
        clientId: this.myClientId,
        data: event.data
      });
    };

    this.source.connect(this.processorNode).connect(this.context.destination);
    this.calling.set(true);
  }

  stopCall() {
    try {
      if (this.source) {
        this.source.disconnect();
      }
      if (this.processorNode) {
        this.processorNode.disconnect();
        this.processorNode.port.onmessage = null;
      }
    } catch (error) {
      console.error("Error disconnecting nodes:", error);
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    this.calling.set(false);
  }
}
