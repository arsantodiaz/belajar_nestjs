import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Retrieves a task by its ID.
   * @param id
   */
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
}
