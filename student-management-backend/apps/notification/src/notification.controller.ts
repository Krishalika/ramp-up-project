import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateStudentEvent } from 'apps/student-management-backend/src/student/events/create-student.event';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('student_created')
  handleStudentCreated(data: CreateStudentEvent) {
    this.notificationService.handleStudentCreated(data);
  }
}
