import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { getConnection } from 'typeorm';
import { StudentEntity } from './student.entity';
import 'reflect-metadata';
import { Socket, io } from 'socket.io-client';
import * as fs from "fs";
import { parse } from 'csv-parse';

type student = {
  id: number
  name: string
  gender: string
  address: string
  mobile: number
  dob: student
  age: number
}

@Processor('upload-queue')
export class UploadConsumer {
  socket: Socket = io('http://localhost:4001');
  allRows = [];
  constructor() { }

  @Process({ name: 'job', concurrency: 8 })
  async uploadJob(job: Job<any>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(job.data.fileName);
    let filePath = `../files/${job.data.fileName}`;

    //read file
    (() => {

      const headers = ['id', 'name', 'gender', 'address', 'mobile', 'dob', 'age'];
      const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

      parse(fileContent, {
        delimiter: ',',
        columns: headers,
        fromLine: 1,
        cast: (columnValue, context) => {
          if (context.column === 'id' || context.column === 'mobile' || context.column === 'age') {
            return parseInt(columnValue, 10);
          }
          return columnValue;
        }
      }, async (error, result: student[]) => {
        if (error) {
          console.error(error);
        }
        this.allRows.push(result)

        this.socket.connect();

        try {

          //save records in the database
          await getConnection('upload')
            .createQueryBuilder()
            .insert()
            .into(StudentEntity)
            .values(this.allRows[0])
            .execute();

          this.socket.emit('test', { id: this.socket.id, message: 'File processing completed successfully' });
        } catch (e) {
          console.log('Error in saving: ', e);
          this.socket.emit('test', { id: this.socket.id, message: 'Error in processing' });
        }
      });
    })();
  }
}

