import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationFEService {
  constructor(private socket: Socket) {}

  listenForMessages(): Observable<string> {
    return this.socket.fromEvent<string>('messages');
  }

  
  sendMessage(msg: string): void {
    this.socket.emit('message', msg);
  }

 
}
