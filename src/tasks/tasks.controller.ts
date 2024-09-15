import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Retrieves all tasks.
   *
   * @returns {TaskModel[]} An array of all tasks.
   */
  @Get()
  getAllTasks(): TaskModel[] {
    return this.tasksService.getAllTasks();
  }

  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  /**
   * Post a task.
   *
   * @returns {TaskModel[]} An array of all tasks.
   */
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): TaskModel {
    console.log('title', title);
    console.log('description', description);
    return this.tasksService.createTask(title, description);
  }
}
