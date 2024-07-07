import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailControllerController {
    constructor(private readonly emailService: EmailService) {}

    @Get('/')
    sendEmail() {
        return this.emailService.sendEmail();
    }

    @Post('/')
    SendEmail(@Body() body) {
        return this.emailService.customSendEmail(body);
    }
}
