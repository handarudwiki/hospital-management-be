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
import { DocumentService } from './document.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateDocumentDto } from './dto/create_document.dto';
import toResponse from 'src/helpers/response';
import { UpdateDocumentDto } from './dto/update_document.dto';

@Controller('document')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return toResponse(
      'document created successfully',
      await this.documentService.create(createDocumentDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return toResponse(
      'document updated successfully',
      await this.documentService.update(id, updateDocumentDto),
    );
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'document deleted successfully',
      await this.documentService.delete(id),
    );
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'document fetched successfully',
      await this.documentService.getOne(id),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'documents fetched successfully',
      await this.documentService.getAll(),
    );
  }
}
