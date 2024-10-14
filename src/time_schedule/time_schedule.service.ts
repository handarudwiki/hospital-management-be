import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTimeScheduleDto } from './dto/create_time_schedule';
import {
  TimeScheduleResponse,
  toTimeScheduleResponse,
} from './response/time_schedule.response';
import { convertWeekNameToWeekNum } from 'src/helpers/convert_week_name';
import { TimeSchedule } from '@prisma/client';
import { UpdateTimeScheduleDto } from './dto/update_time_schedule';

@Injectable()
export class TimeScheduleService {
  constructor(private prisma: PrismaService) {}

  async validateUserExist(userId: number) {
    try {
      const userExist = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExist) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async isTimeScheduleExist(id: number): Promise<TimeSchedule> {
    try {
      const schedule = await this.prisma.timeSchedule.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });

      if (!schedule) {
        throw new NotFoundException('Time schedule not found');
      }

      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(
    createDto: CreateTimeScheduleDto,
  ): Promise<TimeScheduleResponse> {
    try {
      await this.validateUserExist(createDto.user_id);

      const weekNum = convertWeekNameToWeekNum(createDto.week_day);

      const schedule = await this.prisma.timeSchedule.create({
        data: {
          week_day: createDto.week_day,
          week_num: weekNum,
          start_time: createDto.start_time,
          end_time: createDto.end_time,
          duration: createDto.duration,
          user_id: createDto.user_id,
        },
        include: {
          user: true,
        },
      });

      return toTimeScheduleResponse(schedule);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdateTimeScheduleDto,
  ): Promise<TimeScheduleResponse> {
    try {
      const timeScheduleExist = await this.isTimeScheduleExist(id);

      if (updateDto.user_id) {
        await this.validateUserExist(updateDto.user_id);
      }
      let weekNum;
      if (updateDto.week_day) {
        weekNum = convertWeekNameToWeekNum(updateDto.week_day);
      }

      const schedule = await this.prisma.timeSchedule.update({
        where: {
          id,
        },
        data: {
          week_day: updateDto.week_day,
          week_num: weekNum ? weekNum : timeScheduleExist.week_num,
          start_time: updateDto.start_time,
          end_time: updateDto.end_time,
          duration: updateDto.duration,
          user_id: updateDto.user_id,
        },
        include: {
          user: true,
        },
      });

      return toTimeScheduleResponse(schedule);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<TimeScheduleResponse> {
    try {
      const schedule = await this.isTimeScheduleExist(id);

      await this.prisma.timeSchedule.delete({
        where: {
          id,
        },
      });

      return toTimeScheduleResponse(schedule);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<TimeScheduleResponse[]> {
    try {
      const schedules = await this.prisma.timeSchedule.findMany({
        include: {
          user: true,
        },
      });

      return schedules.map((schedule) => toTimeScheduleResponse(schedule));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<TimeScheduleResponse> {
    try {
      const schedule = await this.isTimeScheduleExist(id);

      return toTimeScheduleResponse(schedule);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findUserSchedules(
    userId: number,
    week_num?: number,
  ): Promise<TimeScheduleResponse[]> {
    try {
      await this.validateUserExist(userId);

      const schedules = await this.prisma.timeSchedule.findMany({
        where: {
          user_id: userId,
          ...(week_num && { week_num }),
        },
        include: {
          user: true,
        },
      });

      return schedules.map((schedule) => toTimeScheduleResponse(schedule));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
