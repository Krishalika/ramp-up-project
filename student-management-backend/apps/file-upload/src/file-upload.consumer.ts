import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { readFileSync } from 'fs';
import { getConnection } from 'typeorm';
import { StudentEntity } from './student.entity';
import 'reflect-metadata';
import { Socket, io } from 'socket.io-client';

@Processor('upload-queue')
export class UploadConsumer {
  allRows = [];
  socket: Socket = io('http://localhost:4001');
  constructor() {}

  @Process({ name: 'job', concurrency: 8 })
  async uploadJob(job: Job<any>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(job.data.fileName);

    // let filePath = `../../../../files/` + job.data.fileName;
    // console.log(filePath);

    let filePath = `F:/fc/ramp-up-project/files/${job.data.fileName}`;

    // let filePath = `C:/F/A-crash/fc/Ramp up project/ramp-up-project/files/${job.data.fileName}`;

    //read and save to db
    const csvFile = readFileSync(filePath, 'utf8');

    csvFile.split(/\r?\n/).forEach((line) => {
      this.allRows.push(line);

      // this.allRows.push(Object.assign({}, line));
    });
    console.log(this.allRows);

    try {
      await getConnection('upload')
        .createQueryBuilder()
        .insert()
        .into(StudentEntity)
        .values([
          {
            id: 500,
            name: 'Name1',
            gender: 'Male',
            address: 'Colombo',
            mobile: 713066355,
            dob: 'Mon 13 Jan 1998',
            age: 24,
          },
          {
            id: 502,
            name: 'Name2',
            gender: 'Female',
            address: 'Gampaha',
            mobile: 713066355,
            dob: 'Mon 13 Jan 1998',
            age: 24,
          },
        ])
        .execute();

      this.socket.connect();
      this.socket.emit('test', 'File processing completed successfully');
    } catch (e) {
      console.log('Error in saving: ', e);
      this.socket.connect();
      this.socket.emit('test', 'Error in file processing');
    }
  }
}
