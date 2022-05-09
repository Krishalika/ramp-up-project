import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadQueueProducerService } from './upload-queue.producer.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class FileUploadController {
  constructor(
    private readonly uploadQueueProducerService: UploadQueueProducerService,
  ) { }
  @Post('upload')
  @UseInterceptors(FileInterceptor('csv',
    {
      storage: diskStorage({
        destination: '../files',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  async uploadFile(@UploadedFile() file) {
    console.log("File name: ", file.filename);
    await this.uploadQueueProducerService.sendFileNameToJob(file.filename);
    return file.filename
  }
}
