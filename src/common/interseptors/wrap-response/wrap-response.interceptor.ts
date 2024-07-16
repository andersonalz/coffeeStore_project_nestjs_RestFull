import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';


//wrap all responses data transfer to {data: response}
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before...');
    

    return next.handle().pipe(
      map(data => ({ data }))
    );//when use map method that data argument pass in method all in data property
  }
}
