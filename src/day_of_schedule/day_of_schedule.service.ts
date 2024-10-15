import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDayOfScheduleDto } from './dto/create_day_of_schedule.dto';
import {
  DayOfScheduleResponse,
  toDayOfScheduleResponse,
} from './response/day_of_schedule.response';
import { DayoffSchedule } from '@prisma/client';
import { UpdateDayOfScheduleDto } from './dto/update_day_of_schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DayOfScheduleService {
  constructor(private prismaService: PrismaService) {}

  async validateDoctorExist(doctorId: number) {
    try {
      const doctor = await this.prismaService.user.findUnique({
        where: { id: doctorId, role: 'doctor' },
      });

      if (!doctor) {
        throw new NotFoundException(`doctor not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateDayOfScheduleExist(
    dayOfScheduleId: number,
  ): Promise<DayoffSchedule> {
    try {
      const dayOfSchedule = await this.prismaService.dayoffSchedule.findUnique({
        where: { id: dayOfScheduleId },
        include: {
          doctor: true,
        },
      });

      if (!dayOfSchedule) {
        throw new NotFoundException(`day of schedule not found`);
      }

      return dayOfSchedule;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(
    createDto: CreateDayOfScheduleDto,
  ): Promise<DayOfScheduleResponse> {
    try {
      const { date, doctor_id } = createDto;
      await this.validateDoctorExist(doctor_id);
      const dayOfShcedule = await this.prismaService.dayoffSchedule.create({
        data: {
          doctor_id,
          date: new Date(date),
        },
        include: {
          doctor: true,
        },
      });

      return toDayOfScheduleResponse(dayOfShcedule);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdateDayOfScheduleDto,
  ): Promise<DayOfScheduleResponse> {
    try {
      const dayOfSchedule = await this.validateDayOfScheduleExist(id);

      if (updateDto.doctor_id) {
        await this.validateDoctorExist(updateDto.doctor_id);
      }

      const dayOfShceduleUpdated =
        await this.prismaService.dayoffSchedule.update({
          where: {
            id,
          },
          data: {
            doctor_id: updateDto.doctor_id,
            date: updateDto.date
              ? new Date(updateDto.date)
              : dayOfSchedule.date,
          },
          include: {
            doctor: true,
          },
        });

      return toDayOfScheduleResponse(dayOfShceduleUpdated);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
      await this.validateDayOfScheduleExist(id);

      await this.prismaService.dayoffSchedule.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getSingle(id: number): Promise<DayOfScheduleResponse> {
    try {
      const dayOfSchedule = await this.validateDayOfScheduleExist(id);

      return toDayOfScheduleResponse(dayOfSchedule);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<DayOfScheduleResponse[]> {
    try {
      const dayOfSchedules = await this.prismaService.dayoffSchedule.findMany({
        include: {
          doctor: true,
        },
      });

      return dayOfSchedules.map(toDayOfScheduleResponse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
