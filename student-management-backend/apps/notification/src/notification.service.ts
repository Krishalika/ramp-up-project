import { Injectable } from '@nestjs/common';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';
import { UploadFileEvent } from './events/upload-file.event';
import { Server } from 'socket.io';

@Injectable()
export class NotificationService {

  getHello(): string {
    return 'Hello World!';
  } 
  public socket: Server = null
  handleFileProcessed(data: UploadFileEvent) {
    console.log('File process status: ', data.msg);
    return data.msg;
  }

  handleStudentCreated(data: CreateStudentEvent) {
    console.log('Created student record: ', data);
    return data;
  }


}
