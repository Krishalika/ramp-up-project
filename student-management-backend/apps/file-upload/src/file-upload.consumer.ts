import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as fs from 'fs';

@Processor('upload-queue')
export class UploadConsumer {

    @Process('upload-job')
    async readOperationJob(job: Job<unknown>) {
        let jobData: any = job.data;
        fs.unlinkSync(jobData.filePath);
    }

}
