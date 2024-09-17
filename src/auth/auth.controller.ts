import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('/signin')
  async signIn(
    @Body() authCreadentialsDto: AuthCreadentialsDto,
  ): Promise<{ accessToken: string }> {
    //** Test
    return await this.authService.signIn(authCreadentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
