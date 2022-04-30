import { Body, Controller, Post } from "@nestjs/common";
import { UploadQueueProducerService } from "./upload-queue.producer.service";

@Controller()
export class FileUploadController {
    constructor(
        private readonly uploadQueueProducerService: UploadQueueProducerService
    ) { }

    @Post()
    async sendFileName(@Body() body: { fileName: string }) {
        await this.uploadQueueProducerService.sendFileNameToJob(body.fileName);
        return body;
    }
}