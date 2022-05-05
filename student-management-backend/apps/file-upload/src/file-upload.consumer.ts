import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { readFileSync } from 'fs';
import { getConnection } from 'typeorm';
import { StudentEntity } from './student.entity';
import 'reflect-metadata';
import { StudentRepository } from './student.repository';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { UploadFileEvent } from './events/upload-file.event';

@Processor('upload-queue')
export class UploadConsumer {
    allRows = [];
    private studentRepository: StudentRepository;
    constructor(
        @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy,
    ) {
        // this.studentRepository = getConnection("upload").getCustomRepository(StudentRepository);
    }

    @Process({ name: 'job', concurrency: 8 })
    async uploadJob(job: Job<any>) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(job.data.fileName);

        //let filePath = `F:/fc/ramp-up-project/files/${job.data.fileName}`;

        let filePath = `C:/F/A-crash/fc/Ramp up project/ramp-up-project/files/${job.data.fileName}`;

        //read and save to db
        const csvFile = readFileSync(filePath, 'utf8');

        csvFile.split(/\r?\n/).forEach((line) => {
            this.allRows.push(line);
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

            //send message to notification service
            this.notificationClient.emit(
                'file_processed',
                new UploadFileEvent('File processed successfully'),
            );
        } catch (e) {
            console.log('Error in saving: ', e);

            this.notificationClient.emit(
                'file_processed',
                new UploadFileEvent('Error in file processing'),
            );
        }
    }
}
