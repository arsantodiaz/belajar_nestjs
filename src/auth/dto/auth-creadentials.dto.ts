import { IsString } from 'class-validator';

export class AuthCreadentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
