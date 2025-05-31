import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import { IAudioOfferMessage } from '../../../../backend/src/models';

@Injectable({
  providedIn: 'root',
})
export class VoipService {
  private roomId!: string; // TODO: Remove ! and take it from route
  private peerConnection?: RTCPeerConnection;
  private localStream?: MediaStream;
  private remoteStream = new Subject<MediaStream>();

  public onRemoteStream = this.remoteStream.asObservable();
  public onCallEnded = new EventEmitter<void>();
  public onError = new EventEmitter<string>();

  constructor(
    private api: ApiService,
  ) {
    (window as any).voip = this;
  }
  
  setRoomId(roomId: string) {
    this.roomId = roomId;
  }

  async startCall(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.setupPeerConnection();
      return this.localStream;
    } catch (error) {
      this.onError.emit('Failed to access microphone');
      throw error;
    }
  }

  async signalStartCall() {
    if (!this.peerConnection || !this.roomId || !this.api.client$.value) {
      return console.error("Missing required data");
    }

    const { sdp, type } = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription({ sdp, type });
    console.log("Ready!", { sdp, type });

    const audioOfferPayload = {
      clientId: this.api.client$.value.id,
      roomId: this.roomId,
      sdp,
      type
    };
    console.log({ audioOfferPayload });
    this.api.send("audioOffer", audioOfferPayload);
    this.api.subscribe({ // TODO: This must be moved from here elsewhere but it's fine for now
      "audioOfferReceived": (msg: IAudioOfferMessage) => {
        console.log("Received audio offer", msg);
      }
    });
  }

  endCall(): void {
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnection?.close();
    this.onCallEnded.emit();
  }

  private setupPeerConnection(): void {
    this.peerConnection = new RTCPeerConnection();
    this.localStream?.getTracks().forEach((track) => {
      this.peerConnection?.addTrack(track, this.localStream!);
    });

    this.peerConnection.ontrack = (event) => {
      this.remoteStream.next(event.streams[0]);
    };

    this.peerConnection.onicecandidate = (event) => {
      console.log({ event });
      if (event.candidate) {
        // Send ICE candidate to remote peer (implementation depends on your signaling)
      }
    };
  }

  // Add methods for handling signaling (offer/answer/ICE candidates)
  // These would depend on your backend signaling implementation
}
