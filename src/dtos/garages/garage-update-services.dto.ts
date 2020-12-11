import { IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class GarageUpdateServicesDto {
  @IsArray()
  @IsMongoId({ each: true })
  readonly services: [Types.ObjectId];
}
