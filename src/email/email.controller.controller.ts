import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { isPublic } from 'src/common/decorators/public.decorator';

@Controller('email')
export class EmailControllerController {
    constructor(private readonly emailService: EmailService) {}

    @Get('/')
    @isPublic()
    sendEmail() {
        return this.emailService.sendEmail();
    }

    @Post('/')
    SendEmail(@Body() body) {
        return this.emailService.customSendEmail(body);
    }
}
