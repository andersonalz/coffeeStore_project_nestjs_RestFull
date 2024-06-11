import { IsString } from 'class-validator';

export class CreateFlavorDto {
  @IsString()
  readonly name: string;
}
