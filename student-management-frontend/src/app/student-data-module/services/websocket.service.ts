import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  notification$ = this.socket.fromEvent<any>('client');

  constructor(private socket: Socket) {}
}
