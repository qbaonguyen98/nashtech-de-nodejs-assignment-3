import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateUserByAdminDto {
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

  @IsBoolean()
  public isLocked: boolean;

  @IsBoolean()
  public isDeleted: boolean;
}
