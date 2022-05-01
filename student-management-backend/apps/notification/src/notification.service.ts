import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';

const options = {
  cors: {
    origin: 'http://localhost:4001',
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

// @WebSocketGateway(options)
@Injectable()
@WebSocketGateway(4001)
export class NotificationService {
  @WebSocketServer() server;
  wsClients = [];
  handleStudentCreated(data: CreateStudentEvent) {
    console.log('Created student record: ', data);
    return data;
    //TODO -- websocket implementation
  }

  private broadcast(event, message: any) {
    // const broadCastMessage = JSON.stringify(message);

    const broadCastMessage = this.handleStudentCreated;
    for (let c of this.wsClients) {
      c.emit(event, broadCastMessage);
    }
  }

  @SubscribeMessage('notification')
  onChgEvent(client: any, payload: any) {
    this.broadcast('notification', payload);
  }
}
