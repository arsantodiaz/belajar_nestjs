import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { JwtPayLoad } from './jwt-payload.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersRepository: UsersRepository, // Ensure UsersRepository is injected here
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayLoad): Promise<UserEntity> {
    const { username } = payload;
    const user: UserEntity = await this.usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
