import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';
import { UploadFileEvent } from './events/upload-file.event';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { Socket } from 'socket.io-client';
import { ConnectedSocket, MessageBody, SubscribeMessage } from '@nestjs/websockets';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly gateway: NotificationGateway,
  ) { }

  // socket: Socket

  @EventPattern('file_processed')
  handleFileProcessed(data: UploadFileEvent) {
    this.notificationService.handleFileProcessed(data);
  }


  @Get()
  async getHello() {
    this.gateway.server.emit('messages', 'Hello world from REST API');
    return this.notificationService.getHello();
  }

  @EventPattern('student_created')
  handleStudentCreated(data: CreateStudentEvent) {
    this.notificationService.handleStudentCreated(data);
  }
}


