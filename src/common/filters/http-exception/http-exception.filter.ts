import { ArgumentsHost, Catch, HttpException , ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
@Catch(HttpException) // can tack one parameter or comma separated list.allows us to set difference type of exception
//when get all exceptions instance of Http-exception let pass HttpException to Catch decorator
//accept type argument indicate by <T> to which indicate type of exception  
// since we want process all exception instance of Http-exception lets change class and extend to HttpException  
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) { 
    //for sending response error to client we need original response object and manipulated its. for this propose we use host argument that instance of ArgumentHost
    //and use switchToHttp method on it to get original in flight req and res object
    const ctx = host.switchToHttp();
    // we can use getResponse method on ctx and get res object.for type safety let's specify Response type from express package
    const response = ctx.getResponse<Response>();
    //extra two thing from exception => status and body 
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    // prepare error
    const error = typeof response === 'string' ? {message : exceptionResponse} : (exceptionResponse as object);
    response.status(status).json({
      ...error, 
      timeStamp : new Date().toISOString(),
    });
  }
}
