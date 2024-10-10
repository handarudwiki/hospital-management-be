import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import toResponse from 'src/helpers/response';
import { CreateTimeScheduleDto } from './dto/create_time_schedule';
import { UpdateTimeScheduleDto } from './dto/update_time_schedule';
import { TimeScheduleService } from './time_schedule.service';

@Controller('time-schedule')
export class TimeScheduleController {
  constructor(private timeScheduleService: TimeScheduleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createDto: CreateTimeScheduleDto) {
    return toResponse(
      'Time schedule created successfully',
      await this.timeScheduleService.create(createDto),
    );
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTimeScheduleDto,
  ) {
    return toResponse(
      'Time schedule updated successfully',
      await this.timeScheduleService.update(id, updateDto),
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.timeScheduleService.delete(id);
    return toResponse('Time schedule deleted successfully');
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Time schedule fetched successfully',
      await this.timeScheduleService.findOne(id),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'Time schedule fetched successfully',
      await this.timeScheduleService.findAll(),
    );
  }

  @Get('/user/:userId')
  async getScheduleUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('week_num') week_num?: string,
  ) {
    const weekNumber = week_num ? parseInt(week_num, 10) : undefined;
    return toResponse(
      'Time schedule fetched successfully',
      await this.timeScheduleService.findUserSchedules(userId, weekNumber),
    );
  }
}
