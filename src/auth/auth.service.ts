import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async signUp(authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
    try {
      await this.usersRepository.createUser(authCreadentialsDto);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate key value')
      ) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }
}
