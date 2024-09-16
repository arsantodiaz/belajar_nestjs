import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  // Create User
  async createUser(authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
    const { username, password } = authCreadentialsDto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
