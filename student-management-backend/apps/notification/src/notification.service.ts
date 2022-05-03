import { Injectable } from '@nestjs/common';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';
import { UploadFileEvent } from './events/upload-file.event';

@Injectable()
export class NotificationService {
  handleFileProcessed(data: UploadFileEvent) {
    console.log('File process status: ', data.msg);
    return data.msg;
  }

  handleStudentCreated(data: CreateStudentEvent) {
    console.log('Created student record: ', data);
    return data;
  }

  
}
