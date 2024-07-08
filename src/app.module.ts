import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config'
import * as joi from '@hapi/joi'
import appConfig from './config/app.config';
@Module({
  imports: [
    CoffeeModule,
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,// if set isGlobal property to true, the configModule access in all app and  do not require import in every module
      envFilePath: '.env',
      // ignoreEnvFile: true // this setting for ignore the .env file when set env variable in ui 
      validationSchema: joi.object({
        DATABASE_HOST: joi.required(),
        DATABASE_PORT: joi.number().required().default(5432),
      }),
      load: [ // this option for load the configuration file by business domain in other folder  and we can access it by configService get method
        appConfig 
      ]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),
    EmailModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: '3e986a8dc2e535',
            pass: 'cdd9cdb905821b',
          },
      }
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
