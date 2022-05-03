import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from './file-upload.controller';
import { FileProducerService } from './file-upload.service';

describe('FileUploadController', () => {
  let fileUploadController: FileUploadController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
      providers: [FileProducerService],
    }).compile();

    fileUploadController = app.get<FileUploadController>(FileUploadController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(fileUploadController.getHello()).toBe('Hello World!');
    });
  });
});
