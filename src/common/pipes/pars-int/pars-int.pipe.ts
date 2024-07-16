import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = Number.parseInt(value, 10);
    if(isNaN(val)){
      throw new BadRequestException('validation failed input data is not a number');
    }
    return value;
  }
}
