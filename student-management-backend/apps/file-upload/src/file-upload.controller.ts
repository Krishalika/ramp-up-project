import { Controller, Get, Query } from '@nestjs/common';
import { FileProducerService } from './file-upload.service';

@Controller()
export class FileUploadController {
  constructor(
    private readonly fileProducerService: FileProducerService) { }

  @Get()
  async saveData(@Query('file') file: string) {
    await this.fileProducerService.readFile(file);
    return 'data saved'
  }

}
