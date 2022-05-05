import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
// import { Socket } from 'socket.io-client';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  private logger: Logger = new Logger('NotificationService');
  private socket: Socket;

  constructor(private service: NotificationService) { }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
    console.log('Connected');
  }
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`)
    console.log('disconnected');
  }
  afterInit(server: any) {
    this.service.socket = server;
    console.log('initiated');
  }

  @SubscribeMessage('test')
  handleFileProcessed(client: any, data: any) {
    try {
      this.server.emit('messages', data);
    } catch (e) {
      console.log('Exception: ', e);
    }
  }

  // handleStudentCreated() {
  //   this.server.emit('client', this.service.handleStudentCreated);
  // }
}
