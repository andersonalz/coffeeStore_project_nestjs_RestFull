import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { WrapResponseInterceptor } from './common/interseptors/wrap-response/wrap-response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // we can instead of app.useGlobalPipes(new ValidationPipe()) to use global pipe in app.module.ts in providers file and we can inject dependency to it
  app.useGlobalPipes( // we can use global pipe for apply validation pipe in all app.with use globalPipes and DTO we can filter any extra property or not valid property from body request  
    new ValidationPipe({ 
      whitelist: true, // set whitelist option to true to remove extra property from body request
      transform: true, // set transform option to true to convert string to number or boolean
      forbidNonWhitelisted: true, // set forbidNonWhitelisted option to true to forbid non whitelisted property from body request
    }),
  );
  const option = new DocumentBuilder()
  .setTitle('Coffee API')
  .setDescription('Coffee API description')
  .setVersion('1.0')
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  app.useGlobalFilters(new HttpExceptionFilter()) // set httpExceptionFilter class for apply global filter in all app
  // app.useGlobalGuards(new ApiKeyGuard()) when use this syntax that guard not inject any dependency in class
  app.useGlobalInterceptors(new WrapResponseInterceptor()); // set wrapResponseInterceptor class for apply global interceptor in all app
  await app.listen(3000);
}
bootstrap();
