import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DayOfScheduleService } from './day_of_schedule.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateDayOfScheduleDto } from './dto/create_day_of_schedule.dto';
import toResponse from 'src/helpers/response';
import { UpdateDayOfScheduleDto } from './dto/update_day_of_schedule.dto';

@Controller('day-of-schedule')
export class DayOfScheduleController {
  constructor(private dayOfScheduleSevice: DayOfScheduleService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateDayOfScheduleDto) {
    return toResponse(
      'dayOfSchedule created successfully',
      await this.dayOfScheduleSevice.create(createDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDayOfScheduleDto,
  ) {
    return toResponse(
      'dayOfSchedule updated successfully',
      await this.dayOfScheduleSevice.update(id, updateDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'dayOfSchedule deleted successfully',
      await this.dayOfScheduleSevice.delete(id),
    );
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'dayOfSchedule fetched successfully',
      await this.dayOfScheduleSevice.getSingle(id),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'dayOfSchedule fetched successfully',
      await this.dayOfScheduleSevice.getAll(),
    );
  }
}
