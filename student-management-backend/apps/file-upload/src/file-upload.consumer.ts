import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { readFileSync } from 'fs';
// import { CsvParser } from 'nest-csv-parser';
import { createConnection, getConnection, QueryRunner } from 'typeorm';
import { StudentEntity } from './student.entity';
import 'reflect-metadata';

export type StudentCreateDTO = {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: number;
  dob: string;
  age: number;
};
export type StudentType = {
  id: string;
  name: string;
  gender: string;
  address: string;
  mobile: number;
  dob: string;
  age: number;
};

@Processor('upload-queue')
export class UploadConsumer {
  allRows = [];
  constructor() {}

  @Process({ name: 'job', concurrency: 8 })
  async uploadJob(job: Job<any>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(job.data.fileName);

    let filePath = `F:/fc/ramp-up-project/files/${job.data.fileName}`;
    //read and save to db
    const csvFile = readFileSync(filePath, 'utf8');

    csvFile.split(/\r?\n/).forEach((line) => {
      console.log(`Line from file: ${line}`);
      this.allRows.push(line);
    });
    console.log(this.allRows);  

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(StudentEntity)
        .values([
          {
            id: 1,
            name: 'Name1',
            gender: 'Male',
            address: 'Colombo',
            mobile: 713066355,
            dob: 'Mon 13 Jan 1998',
            age: 24,
          },
          {
            id: 2,
            name: 'Name2',
            gender: 'Female',
            address: 'Gampaha',
            mobile: 713066355,
            dob: 'Mon 13 Jan 1998',
            age: 24,
          },
        ])
        .execute();
    } catch (e) {
      console.log('Error is saving: ', e);
    }
    //     createConnection()
    //       .then(async (connection) => {
    //         // INSERT USER
    //         await connection
    //           .createQueryBuilder()
    //           .insert()
    //           .into(StudentEntity)
    //           .values([
    //             {
    //               id: 1,
    //               name: 'Name1',
    //               gender: 'Male',
    //               address: 'Colombo',
    //               mobile: 713066355,
    //               dob: 'Mon 13 Jan 1998',
    //               age: 24,
    //             },
    //             {
    //               id: 2,
    //               name: 'Name2',
    //               gender: 'Female',
    //               address: 'Gampaha',
    //               mobile: 713066355,
    //               dob: 'Mon 13 Jan 1998',
    //               age: 24,
    //             },
    //           ])
    //           .execute();
    //       })
    //       .catch((error) => console.log(error));
  }
}
