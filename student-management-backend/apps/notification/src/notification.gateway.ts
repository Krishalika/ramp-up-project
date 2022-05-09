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
import { Server, Socket } from 'socket.io';
import { io } from 'socket.io-client';

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  socket: Socket
  private logger: Logger = new Logger('NotificationService');

  constructor(private service: NotificationService) { }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
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
  handleFileProcessed(client: Socket, data: { id: string, message: string }) {
    try {
      this.server.emit('messages', data.message)
    } catch (e) {
      console.log('Exception: ', e);
    }
  }


}
