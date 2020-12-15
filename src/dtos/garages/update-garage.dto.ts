import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateGarageDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  readonly address?: number;

  @IsNumber()
  @IsOptional()
  readonly location?: number;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted?: boolean;
}
