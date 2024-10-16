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
import { CreateServiceDto } from './dto/create_service.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import toResponse from 'src/helpers/response';
import { ServiceService } from './service.service';
import { UpdateServiceDto } from './dto/update_service.dto';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateServiceDto) {
    return toResponse(
      'service created successfully',
      await this.serviceService.create(createDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateServiceDto,
  ) {
    return toResponse(
      'service updated successfully',
      await this.serviceService.update(id, updateDto),
    );
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'service fetched successfully',
      await this.serviceService.getOne(id),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'service fetched successfully',
      await this.serviceService.getAll(),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'service deleted successfully',
      await this.serviceService.delete(id),
    );
  }
}
