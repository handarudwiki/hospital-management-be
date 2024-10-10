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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateLapTemplateDto } from './dto/create_lap_template.dto';
import toResponse from 'src/helpers/response';
import { LapTemplateService } from './lap_template.service';
import { UpdateLapTemplateDto } from './dto/update_lap_template.dto';

@Controller('lap-template')
export class LapTemplateController {
  constructor(private lapTemplateService: LapTemplateService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateLapTemplateDto) {
    return toResponse(
      'Lap Template created successfully',
      await this.lapTemplateService.create(createDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: UpdateLapTemplateDto,
  ) {
    return toResponse(
      'Lap Template updated successfully',
      await this.lapTemplateService.update(id, createDto),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'Lap Templates retrieved successfully',
      await this.lapTemplateService.findAll(),
    );
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Lap Template retrieved successfully',
      await this.lapTemplateService.findOne(id),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.lapTemplateService.remove(id);
    return toResponse('Lap Template deleted successfully');
  }
}
