import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';

class Coordinates {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

class Location {
  @IsObject()
  coordinates: Coordinates;

  @IsString()
  googleId: string;
}

export class CreateGarageDto {
  @IsNumber()
  public readonly code: number;

  @IsString()
  public readonly name: string;

  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsString()
  public readonly address: string;

  @IsObject()
  public readonly location: Location;
}
