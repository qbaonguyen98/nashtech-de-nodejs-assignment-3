import { IsString } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  public idToken: string;
}
