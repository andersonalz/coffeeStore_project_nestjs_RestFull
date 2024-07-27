import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("🚀 ~ ParsIntPipe ~ transform ~ value:", value)
    const val = Number.parseInt(value, 10);
    if(isNaN(val)){
      throw new BadRequestException('validation failed input data is not a number');
    }
    return val;
  }
}
