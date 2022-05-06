import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadQueueProducerService } from './upload-queue.producer.service';

@Controller()
export class FileUploadController {
  constructor(
    private readonly uploadQueueProducerService: UploadQueueProducerService,
  ) {}

  @Post()
  async sendFileName(@Body() body: { fileName: string }) {
    await this.uploadQueueProducerService.sendFileNameToJob(body.fileName);
    return body;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.originalname);
  }
}
