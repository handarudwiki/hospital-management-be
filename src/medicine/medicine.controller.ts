import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { MedicineService } from './medicine.service';
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
import { CreateMedicineDto } from './dto/create_medicine.dto';
import toResponse from 'src/helpers/response';
import { UpdateMedicineDto } from './dto/udpate_medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateMedicineDto) {
    return toResponse(
      'Create medicine successfully',
      await this.medicineService.create(createDto),
    );
  }

  @Get('/')
  async getAll() {
    return toResponse(
      'Get all medicine successfully',
      await this.medicineService.findAll(),
    );
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Get single medicine successfully',
      await this.medicineService.findOne(id),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMedicineDto,
  ) {
    return toResponse(
      'Update medicine successfully',
      await this.medicineService.update(id, updateDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Delete medicine successfully',
      await this.medicineService.delete(id),
    );
  }
}
