import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';
import { UploadFileEvent } from './events/upload-file.event';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly gateway: NotificationGateway,
  ) {}

  @EventPattern('student_created')
  handleStudentCreated(data: CreateStudentEvent) {
    this.notificationService.handleStudentCreated(data);
  }

  // @EventPattern('file_processed')
  // handleFileProcessed(data: UploadFileEvent) {
  //   this.notificationService.handleFileProcessed(data);
  // }

  @EventPattern('file_processed')
  handleFileProcessed(data: UploadFileEvent) {
    return this.notificationService.handleFileProcessed(data);
  }

  @Get('test')
  handle(client: any, data: any) {
    client.emit('test', this.handleFileProcessed);
  }
}
