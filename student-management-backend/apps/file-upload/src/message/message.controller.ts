import { Controller, Get, Query } from '@nestjs/common';
import { MessageProducerService } from './message.producer.service';

@Controller()
export class MessageController {
    constructor(
        private readonly messageProducerService: MessageProducerService) { }

    @Get('invoke-msg')
    getInvokeMsg(@Query('msg') msg: string) {
        this.messageProducerService.sendMessage(msg);
        return msg;
    }
}