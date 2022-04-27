import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class FileProducerService {
  constructor(@InjectQueue('upload-queue') private queue: Queue) { }

  async readFile(fileName: string) {
    let filePath = `C:/F/files/${fileName}`;

    // logic to save the file record in database.
    
    await this.queue.add('upload-job', {
      filePath: filePath
    });
  }
}