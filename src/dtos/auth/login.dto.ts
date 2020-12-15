import { IsString, MinLength, MaxLength } from 'class-validator';

export class InternalLoginDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public password: string;
}
