import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository, // Ensure UsersRepository is injected here
    private jwtService: JwtService,
  ) {}

  async signUp(authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCreadentialsDto);
  }

  async signIn(
    authCreadentialsDto: AuthCreadentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCreadentialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // return 'Success';
      const payload: JwtPayLoad = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
