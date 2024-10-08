import { DepartmentService } from './department.service';
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
import { createDepartmentDto } from './dto/create_department.dto';
import toResponse from 'src/helpers/response';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { updateDepartmentDto } from './dto/update_department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  async create(@Body() createDto: createDepartmentDto) {
    return toResponse(
      'department created successfully',
      await this.departmentService.create(createDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: updateDepartmentDto,
  ) {
    return toResponse(
      'department updated successfully',
      await this.departmentService.update(id, updateDto),
    );
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Get detail deparment successflly',
      await this.departmentService.findOne(id),
    );
  }

  @Get('/')
  async getAll() {
    return toResponse(
      'Get all deparment successflly',
      await this.departmentService.findAll(),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(await this.departmentService.remove(id));
  }
}
