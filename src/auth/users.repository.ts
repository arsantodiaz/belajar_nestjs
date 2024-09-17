import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
    const { username, password } = authCreadentialsDto;

    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('Password ', hashedPassword);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      console.log(error.code);
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
