import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate { //one important requirement guards import CanActivate interface from nestjs/common
  //this 
  canActivate( // this interface provide us canActivate method within our class
    context: ExecutionContext, //this arguments inherit from host argument and we can get inflight request response native object 
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.header('Authorization');
    if(authorization === process.env.API_KEY){
      return true;
    }
    return false;
  }
}
