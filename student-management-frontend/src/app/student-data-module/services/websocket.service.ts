import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  notification$ = this.socket.fromEvent<any>('client');

  constructor(private socket: Socket) {}

  listenForMessages(): Observable<string> {
    return this.socket.fromEvent<string>('messages');
  }
}
