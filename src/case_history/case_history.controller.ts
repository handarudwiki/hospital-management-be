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
import { UpdateCaseHistoryDto } from './dto/update_case_history.dto';
import { CreateCaseHistoryDto } from './dto/create_case_history.dto';
import toResponse from 'src/helpers/response';
import { CaseHistoryService } from './case_history.service';

@Controller('case-history')
export class CaseHistoryController {
  constructor(private caseHistoryService: CaseHistoryService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDto: CreateCaseHistoryDto) {
    return toResponse(
      'caseHistory created successfully',
      await this.caseHistoryService.create(createDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCaseHistoryDto,
  ) {
    return toResponse(
      'caseHistory updated successfully',
      await this.caseHistoryService.update(id, updateDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'caseHistory deleted successfully',
      await this.caseHistoryService.delete(id),
    );
  }

  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'caseHistory fetched successfully',
      await this.caseHistoryService.getOne(id),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'caseHistory fetched successfully',
      await this.caseHistoryService.getAll(),
    );
  }
}
