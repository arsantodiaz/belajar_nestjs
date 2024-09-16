import { Body, Controller, Post } from '@nestjs/common';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCreadentialsDto: AuthCreadentialsDto) {
    return this.authService.signUp(authCreadentialsDto);
  }
}
