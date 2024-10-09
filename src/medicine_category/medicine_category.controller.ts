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
import { MedicineCategoryService } from './medicine_category.service';
import toResponse from 'src/helpers/response';
import CreateMedicineCategoryDto from './dto/create_medicine_category.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import UpdateMedicineCategoryDto from './dto/udpate_medicine_category.dto';

@Controller('medicine-category')
export class MedicineCategoryController {
  constructor(private medicineCatgeoryService: MedicineCategoryService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateMedicineCategoryDto) {
    return toResponse(
      'Create medicine category successfully',
      await this.medicineCatgeoryService.create(createDto),
    );
  }

  @Get('/')
  async getAll() {
    return toResponse(
      'Get all medicine category successfully',
      await this.medicineCatgeoryService.findAll(),
    );
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Get single medicine category successfully',
      await this.medicineCatgeoryService.findOne(id),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMedicineCategoryDto,
  ) {
    return toResponse(
      'Update medicine category successfully',
      await this.medicineCatgeoryService.update(id, updateDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Delete medicine category successfully',
      await this.medicineCatgeoryService.delete(id),
    );
  }
}
