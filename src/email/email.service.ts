import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(){
        try {
        const message = '<h1>test email</h1>';
        const email = await this.mailerService.sendMail({
            from: 'from@example.com',
            to: 'ehsanalizadegan55@gmail.com',
            subject: 'Test email',
            text: message,
            html: message,
        })   
        console.log("🚀 ~ EmailService ~ sendEmail ~ email:", email)  
        } catch (error) {
            console.log(error);
            
        }
        
    }

    async customSendEmail(data){
        try {
        const option = {
            form: data.from,
            to: data.to,
            text: data.text,
            html: data.html
        }
        const email = await this.mailerService.sendMail(option)
            if (email.response !== '250 2.0.0 Ok: queued') {
              console.log(email);
            }  
        } catch (error) {
           console.log(error);
        }
    }
}
