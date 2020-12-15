import { IsMongoId, IsOptional, IsString, IsEnum, IsNumber, IsJSON, IsNumberString } from 'class-validator';
import { Types } from 'mongoose';

const SORT_OPTIONS = ['asc', 'desc'] as const;

type SortOption = typeof SORT_OPTIONS[number];

export class ServicesFilterDto {
  @IsNumber()
  @IsOptional()
  public readonly code?: number;

  @IsString()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsNumber()
  @IsOptional()
  public readonly price?: number;

  @IsMongoId()
  @IsOptional()
  public readonly createdBy?: Types.ObjectId;
}

export class QueryServicesDto {
  @IsJSON()
  @IsOptional()
  public filter?: ServicesFilterDto;

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
