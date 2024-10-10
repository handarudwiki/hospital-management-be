import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LapReportService } from './lap_report.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UdpateLapReportDto } from './dto/update_lap_report.dto';
import toResponse from 'src/helpers/response';
import { CreateLapReportDto } from './dto/create_lap_report.dto';

@Controller('lap-report')
export class LapReportController {
  constructor(private lapReportService: LapReportService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateLapReportDto) {
    return toResponse(
      'Lap Report created successfully',
      await this.lapReportService.create(createDto),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'Lap Reports retrieved successfully',
      await this.lapReportService.findAll(),
    );
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return toResponse(
      'Lap Report retrieved successfully',
      await this.lapReportService.findOne(id),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number) {
    await this.lapReportService.remove(id);
    return toResponse('Lap Report deleted successfully');
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() createDto: UdpateLapReportDto) {
    return toResponse(
      'Lap Report updated successfully',
      await this.lapReportService.update(id, createDto),
    );
  }
}
