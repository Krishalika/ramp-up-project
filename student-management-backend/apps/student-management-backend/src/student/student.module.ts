import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
      },
    ]),
  ],
  providers: [StudentService, StudentResolver],
})
export class StudentModule {}
