import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(
    private tasksService: TasksService,
    private configService: ConfigService,
  ) {
    console.log(`Config ${this.configService.get('TEST_VALUE')}`);
  }

  /**
   * Retrieves a task by its ID.
   * @param id
   * @param user
   */
  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<Task> {
    this.logger.log(
      `User "${user.username}" retrieving a task with ID "${id}"`,
    );
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: UserEntity,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: UserEntity,
  ): Promise<{ task: { id: string; title: string }; message: string }> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @GetUser() user: UserEntity,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: UserEntity,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving a task with Filter "${JSON.stringify(filterDto)}"`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }
}
