import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

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
  app.useGlobalFilters(new HttpExceptionFilter()) // set httpExceptionFilter class for apply global filter in all app
  // app.useGlobalGuards(new ApiKeyGuard()) when use this syntax that guard not inject any dependency in class
  await app.listen(3000);
}
bootstrap();
