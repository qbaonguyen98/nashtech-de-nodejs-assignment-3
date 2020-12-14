import { IsString, MinLength, MaxLength } from 'class-validator';

export class InternalLoginDto {
  @IsString()
  public username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public password: string;
}
