import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
})
export class NotificationModule { }
