import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class UploadQueueProducerService {
    constructor(@InjectQueue('upload-queue') private uploadQueue: Queue) { }

    async sendFileNameToJob(fileName: string) {
        await this.uploadQueue.add('job', { fileName })
    }
}