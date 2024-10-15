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
import { PresctiptionService } from './presctiption.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import toResponse from 'src/helpers/response';
import { UpdatePrescriptionDto } from './dto/update_presciption.dto';
import { CreatePrescriptionDto } from './dto/create_prescription.dto';

@Controller('presctiption')
export class PresctiptionController {
  constructor(private pressciptionService: PresctiptionService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return toResponse(
      'prescription created successfully',
      await this.pressciptionService.create(createPrescriptionDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return toResponse(
      'prescription updated successfully',
      await this.pressciptionService.update(id, updatePrescriptionDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'prescription deleted successfully',
      await this.pressciptionService.delete(id),
    );
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'prescription fetched successfully',
      await this.pressciptionService.getOne(id),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'prescriptions fetched successfully',
      await this.pressciptionService.getAll(),
    );
  }
}
