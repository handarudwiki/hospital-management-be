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
import { AppointmentService } from './appointment.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import toResponse from 'src/helpers/response';
import { UpdaeteAppointmentDto } from './dto/update_appointment.dto';
import { CreateAppointmentDto } from './dto/create_appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return toResponse(
      'Appointment created',
      await this.appointmentService.create(createAppointmentDto),
    );
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdaeteAppointmentDto,
  ) {
    return toResponse(
      'Appointment updated',
      await this.appointmentService.update(id, updateAppointmentDto),
    );
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Appointment found',
      await this.appointmentService.findOne(id),
    );
  }

  @Get()
  async getAll(@Query('date') date: string) {
    return toResponse(
      'Appointments found',
      await this.appointmentService.findAll(new Date(date)),
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteAppointment(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Appointment deleted',
      await this.appointmentService.delete(id),
    );
  }
}
