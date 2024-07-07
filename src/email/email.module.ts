import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailControllerController } from './email.controller.controller';

@Module({
    imports: [],
    controllers: [EmailControllerController],
    providers: [EmailService],
})
export class EmailModule {}
