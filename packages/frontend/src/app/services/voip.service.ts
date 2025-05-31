import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoipService {
  private peerConnection?: RTCPeerConnection;
  private localStream?: MediaStream;
  private remoteStream = new Subject<MediaStream>();

  public onRemoteStream = this.remoteStream.asObservable();
  public onCallEnded = new EventEmitter<void>();
  public onError = new EventEmitter<string>();

  async startCall(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.setupPeerConnection();
      return this.localStream;
    } catch (error) {
      this.onError.emit('Failed to access microphone');
      throw error;
    }
  }

  async signalStartCall() {}

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
