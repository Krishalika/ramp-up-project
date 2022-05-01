import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadConsumer } from './file-upload.consumer';
import { FileUploadController } from './file-upload.controller';
import { FileProducerService } from './file-upload.service';
import { MessageConsumer } from './message/message.consumer';
import { MessageController } from './message/message.controller';
import { MessageProducerService } from './message/message.producer.service';
import { StudentEntity } from './student.entity';

@Module({
  imports: [
    // CsvModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue(
      {
        name: 'upload-queue',
      },
      {
        name: 'message-queue',
      },
    ),
    TypeOrmModule.forRoot({
      // name: 'upload',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'student',
      entities: ["src/**/*.entity{.ts,.js}"],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [FileUploadController, MessageController],
  providers: [
    FileProducerService,
    UploadConsumer,
    MessageProducerService,
    MessageConsumer,
  ],
})
export class FileUploadModule {}
