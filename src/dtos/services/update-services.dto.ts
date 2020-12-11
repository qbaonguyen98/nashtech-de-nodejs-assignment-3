import { IsString, IsMongoId, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted?: boolean;
}
