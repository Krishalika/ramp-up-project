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

@WebSocketGateway({ cors: true })
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server;

  private logger: Logger = new Logger('NotificationService');

  constructor(private service: NotificationService) {}

  handleConnection(client: any, ...args: any[]) {
    console.log("Connected");
    
  }
  handleDisconnect(client: any) {
    console.log("disconnected");
    
  }
  afterInit(server: any) {
    console.log("initiated");
    
  }

  @SubscribeMessage("test")
  handleFileProcessed(client:any, data:any) {
    try {
      this.server.emit('messages', data);
    } catch (e) {
      console.log('Exception: ', e);
    }
  }

  handleStudentCreated() {
    this.server.emit('client', this.service.handleStudentCreated);
  }
}
