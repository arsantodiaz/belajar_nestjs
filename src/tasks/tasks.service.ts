// src/tasks/tasks.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { isUUID } from 'class-validator';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UserEntity } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string, user: UserEntity): Promise<Task> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ID format: "${id}"`);
    }
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(
    id: string,
    user: UserEntity,
  ): Promise<{ task: { id: string; title: string }; message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ID format: "${id}"`);
    }

    const task = await this.getTaskById(id, user);
    const result = await this.tasksRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return {
      task: { id: task.id, title: task.title },
      message: 'Task successfully deleted',
    };
  }

  async updateTaskStatus(
    id: string,
    status: string,
    user: UserEntity,
  ): Promise<Task> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ID format: "${id}"`);
    }

    const task = await this.getTaskById(id, user);
    task.status = status as any;
    await this.tasksRepository.save(task);

    return task;
  }

  getTasks(filterDto: GetTasksFilterDto, user: UserEntity): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }
}
