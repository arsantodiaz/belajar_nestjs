import { Body, Controller, Post } from '@nestjs/common';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCreadentialsDto: AuthCreadentialsDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(authCreadentialsDto);
    return { message: 'user created' };
  }
}
