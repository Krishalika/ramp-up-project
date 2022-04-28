import { Injectable } from '@nestjs/common';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';

@Injectable()
export class NotificationService {
  handleStudentCreated(data: CreateStudentEvent) {
    console.log('handle user create - NOTIFICATION', data);

    //TODO -- email the user
    //TODO -- websocket implementation
    
  }
}
