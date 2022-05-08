import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadConsumer } from './file-upload.consumer';
import { FileUploadController } from './file-upload.controller';
import { FileProducerService } from './file-upload.service';
import { StudentEntity } from './student.entity';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue({
      name: 'upload-queue',
    }),
    TypeOrmModule.forRoot({
      name: 'upload',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'student',
      entities: [StudentEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileProducerService, UploadConsumer],
})
export class FileUploadModule {}
