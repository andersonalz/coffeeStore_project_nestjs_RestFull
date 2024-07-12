import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
@Injectable()
export class ApiKeyGuard implements CanActivate { //one important requirement guards import CanActivate interface from nestjs/common
  constructor(
    private readonly reflector: Reflector,// reflector class is provide us to get metadata from class within a specific context
    private readonly configService: ConfigService
  ) {}
  //this 
  canActivate( // this interface provide us canActivate method within our class
    context: ExecutionContext, //this arguments inherit from host argument and we can get inflight request response native object 
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // const metaData = this.reflector.get(IS_PUBLIC_KEY, context.getClass());
    if (isPublic) return true;
    const authHeader = request.header('Authorization');
    if(authHeader === this.configService.get('API_KEY')) {
      return true;
    }
    return false;
  }
}
