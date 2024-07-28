import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  // @IsNumber()
  // readonly id: number;
  @ApiProperty({description : 'Coffee name'})
  @IsString()
  readonly name: string;

  @ApiProperty({description : 'Coffee brand'})
  @IsString()
  readonly brand: string;

  @ApiProperty({
    description : 'Coffee flavors',
    example : ['vanilla', 'chocolate']
  })
  @IsString({ each: true })
  readonly flavors: [string];
}
