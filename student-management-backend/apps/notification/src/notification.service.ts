import { Injectable, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';
import { UploadFileEvent } from './events/upload-file.event';

const options = {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
};

// @WebSocketGateway(4001)

@Injectable()
@WebSocketGateway({ cors: true })
export class NotificationService {
  @WebSocketServer() server;
  wsClients = [];
  private logger: Logger = new Logger('NotificationService');

  handleFileProcessed(data: UploadFileEvent) {
    console.log('File process status: ', data.msg);
    try {
      this.server.emit('messages', data.msg);
      console.log("Trying to pass...");
      
    } catch (e) {
      console.log('Exception in notify: ', e);
    }
  }

  @SubscribeMessage('client')
  handleStudentCreated(data: CreateStudentEvent) {
    console.log('Created student record: ', data);
    // this.server.emit('client', data);
    // this.logger.log('notification printed', data);
    // return data;
    this.broadcast('client', this.handleStudentCreated);

    //TODO -- websocket send notification
  }

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (let c of this.wsClients) {
      c.emit(event, message);
    }
  }

  @SubscribeMessage('my-event')
  onChgEvent(client: any, payload: any) {
    this.broadcast('my-event', payload);
  }

  // private broadcast(event, message: any) {
  //   // const broadCastMessage = JSON.stringify(message);

  //   const broadCastMessage = this.handleStudentCreated;
  //   for (let c of this.wsClients) {
  //     c.emit(event, broadCastMessage);
  //   }
  // }

  // @SubscribeMessage('notification')
  // onChgEvent(client: any, payload: any) {
  //   this.logger.log('notification printed');
  //   // this.broadcast('notification', payload);

  //   //this.broadcast('client', this.handleStudentCreated);
  //   this.server.emit('client', this.handleStudentCreated);
  // }

  @SubscribeMessage('notification1')
  passMessage() {
    this.logger.log('notification printed');
    // this.server.emit('client', this.handleStudentCreated);

    this.broadcast('client', this.handleStudentCreated);
  }
}
