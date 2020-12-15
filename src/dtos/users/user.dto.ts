import { IsString, IsEmail, IsNumber, IsBoolean } from 'class-validator';

export class UserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public gender: string;

  @IsNumber()
  public dateOfBirth: number;

  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public accountType: string;

  @IsNumber()
  public lastLogin: number;

  @IsBoolean()
  public isLocked: boolean;
}
