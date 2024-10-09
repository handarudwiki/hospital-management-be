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
import { BedService } from './bed.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import toResponse from 'src/helpers/response';
import { CreateBedDto } from './dto/create_bed.dto';
import { UpdateBedDto } from './dto/update_bed.dto';

@Controller('bed')
export class BedController {
  constructor(private bedService: BedService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateBedDto) {
    return toResponse(
      'Bed created successfully',
      await this.bedService.create(createDto),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'Get all beds successfully',
      await this.bedService.getAll(),
    );
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Get single bed successfully',
      await this.bedService.findById(id),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBedDto,
  ) {
    return toResponse(
      'Update bed successfully',
      await this.bedService.update(id, updateDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Delete bed successfully',
      await this.bedService.delete(id),
    );
  }
}
