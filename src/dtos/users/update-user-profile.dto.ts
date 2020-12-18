import { IsString, IsNumber } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  public id: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public gender: string;

  @IsNumber()
  public dateOfBirth: number;
}
