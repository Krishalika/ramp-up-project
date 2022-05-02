import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationFEService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string): void {
    //'message' -> same name in be @SubscribeMessage
    this.socket.emit('message', msg);
  }

  listenForMessages(): Observable<string> {
    return this.socket.fromEvent<string>('messages');
  }
}
