import { IsString, IsEmail, IsNumber } from 'class-validator';

export class UserListDto {
  @IsString()
  public fullName: string;

  @IsEmail()
  public email: string;

  @IsNumber()
  public lastLogin: number;
}
