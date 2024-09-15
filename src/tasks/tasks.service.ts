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

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ID format: "${id}"`);
    }
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(
    id: string,
  ): Promise<{ task: { id: string; title: string }; message: string }> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ID format: "${id}"`);
    }

    const task = await this.getTaskById(id);
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return {
      task: { id: task.id, title: task.title },
      message: 'Task successfully deleted',
    };
  }
}
