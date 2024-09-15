import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Retrieves all tasks.
   *
   * @returns {TaskModel[]} An array of all tasks.
   */
  // @Get()
  getAllTasks(): TaskModel[] {
    return this.tasksService.getAllTasks();
  }

  @Get()
  getAllTasksFiltered(@Query() filterDto: GetTasksFilterDto): TaskModel[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
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
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): TaskModel {
  //   console.log('title', title);
  //   console.log('description', description);
  //   return this.tasksService.createTask(title, description);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): TaskModel {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Retrieves a task by its ID.
   * @param id
   */
  @Get('/:id')
  getTaskById(@Param('id') id: string): TaskModel {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  /**
   * Deletes a task by its ID.
   * @param id
   */
  @Delete('/:id')
  deleteTask(@Param('id') id: string): { message: string } {
    const varResult: boolean = this.tasksService.deleteTask(id);

    if (varResult) {
      return { message: 'Task successfully deleted' };
    } else {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  /**
   * Updates a task's status by its ID.
   * @param id
   * @param status
   */
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): TaskModel {
    const varResult: boolean = this.tasksService.deleteTask(id);

    if (varResult) {
      return this.tasksService.updateTaskStatus(id, status);
    } else {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
