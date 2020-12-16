import { IsEmail, IsJWT, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RequestTokenDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public refreshToken: string;

  constructor(userId: string, refreshToken: string) {
    this.userId = userId;
    this.refreshToken = refreshToken;
  }
}

export class RequestEmailDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}

export class RequestVerifyDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsJWT()
  @IsNotEmpty()
  public token: string;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public newPassword: string;
}

export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public oldPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public newPassword: string;
}
