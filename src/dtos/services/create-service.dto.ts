import { IsString, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsNumber()
  public readonly code: number;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly description: string;

  @IsNumber()
  public readonly price: number;
}
