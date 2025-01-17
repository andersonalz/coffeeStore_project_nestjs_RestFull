import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.method + ' '+ req.rawHeaders[1] + req.baseUrl);
    console.time('Request-time');
    res.on('finish', () => {
      console.timeEnd('Request-time');
      console.log('Request completed');
    });
    next();
  }
}
