// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { DataSource } from 'typeorm';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'TasksRepository',
      useFactory: (dataSource: DataSource) => new TasksRepository(dataSource),
      inject: [DataSource],
    },
  ],
})
export class TasksModule {}
