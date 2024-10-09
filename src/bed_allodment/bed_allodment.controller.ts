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
import { BedAllodmentService } from './bed_allodment.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import toResponse from 'src/helpers/response';
import { UpdateBedAllodMent } from './dto/update_bed_allodment';
import { CreaBedAllodMent } from './dto/create_bed_allodment';

@Controller('bed-allodment')
export class BedAllodmentController {
  constructor(private bedAllodMentService: BedAllodmentService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreaBedAllodMent) {
    return toResponse(
      'Bed Allodment created successfully',
      await this.bedAllodMentService.create(createDto),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'Get all Bed Allodment successfully',
      await this.bedAllodMentService.findAll(),
    );
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Get single Bed Allodment successfully',
      await this.bedAllodMentService.findOne(id),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBedAllodMent,
  ) {
    return toResponse(
      'Update Bed Allodment successfully',
      await this.bedAllodMentService.update(id, updateDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Delete Bed Allodment successfully',
      await this.bedAllodMentService.remove(id),
    );
  }
}
