import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
// import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 7432,
      username: 'postgres',
      password: 'postgres',
      database: 'task_management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  // providers: [TasksService],
})
export class AppModule {}
