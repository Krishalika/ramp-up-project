import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BullModule } from '@nestjs/bull';
import { FileUploadController } from './file-upload/upload.controller';
import { UploadQueueProducerService } from './file-upload/upload-queue.producer.service';

@Module({
  imports: [
    StudentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'student',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue(
      {
        name: 'upload-queue'
      }
    ),
  ],
  controllers: [FileUploadController],
  providers: [UploadQueueProducerService],
})
export class AppModule { }
