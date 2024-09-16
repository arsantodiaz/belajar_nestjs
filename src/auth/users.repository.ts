import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCreadentialsDto } from './dto/auth-creadentials.dto';

export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(authCreadentialsDto: AuthCreadentialsDto): Promise<void> {
    const { username, password } = authCreadentialsDto;

    const user = this.create({ username, password });
    await this.save(user);
  }
}
