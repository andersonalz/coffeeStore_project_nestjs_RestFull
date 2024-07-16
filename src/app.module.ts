import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core'
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common/common.module';
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
    // TypeOrmModule.forRoot({
      TypeOrmModule.forRootAsync({ // load for async configuration object by use async method an useFactory function 
        useFactory: () => ({       // this method can allowed to return a promise object and use able to inject dependency to the inject property 
          type: 'postgres',        // for example inject configService and use the instead of process.env 
          host: process.env.DATABASE_HOST, // extract the process.env object by config module
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USERNAME, 
          password: process.env.DATABASE_PASS,
          database: process.env.DATABASE_NAME,
          synchronize: true,
          autoLoadEntities: true, 
        })
     
    }),
    EmailModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: +process.env.MAIL_PORT,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        }
      }),
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService ,
    {
      provide: APP_PIPE, //APP_PIPE is special token exported from nest core package 
      useClass: ValidationPipe,// this syntax we can inject dependency an when app wants to run create instant pipe and It applies to the whole system and register it as global pipe
    } 
  ],
})
export class AppModule {}
 