import { IsMongoId, IsOptional, IsString, IsEnum, IsNumber, IsJSON, IsNumberString } from 'class-validator';
import { Types } from 'mongoose';

const SORT_OPTIONS = ['asc', 'desc'] as const;

type SortOption = typeof SORT_OPTIONS[number];

export class GaragesFilterDto {
  @IsNumber()
  @IsOptional()
  public readonly code?: number;

  @IsString()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsMongoId()
  @IsOptional()
  public readonly createdBy?: Types.ObjectId;
}

export class QueryGaragesDto {
  @IsJSON()
  @IsOptional()
  public filter?: GaragesFilterDto;

  @IsEnum(SORT_OPTIONS)
  @IsOptional()
  public readonly sortOrder?: SortOption = 'asc';

  @IsOptional()
  @IsString()
  public readonly sortField?: string = '_id';

  @IsOptional()
  @IsMongoId()
  public readonly lastId?: string;

  @IsOptional()
  @IsNumberString()
  public readonly limit?: string = '10';
}
