import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateDoctorDto } from './dto/create_doctor.dto';
import { UpdateDoctorDto } from './dto/update_doctot.dto';
import toResponse from 'src/helpers/response';
import { UploadFile } from 'src/common/decorators/upload_files.decorator';

@Controller('doctors')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UploadFile('picture', 'doctors')
  async createDoctor(
    @Body() createDto: CreateDoctorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return toResponse(
      'create doctor successfully',
      await this.doctorService.create(createDto, file),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  @UploadFile('picture', 'doctors')
  async updateDoctor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateDoctorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return toResponse(
      'update doctor sucessfully',
      await this.doctorService.update(id, updateDto, file),
    );
  }

  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'Get single doctor successfully',
      await this.doctorService.findById(id),
    );
  }

  @Get('/')
  async getAll() {
    return toResponse(
      'Get all doctors successfully',
      await this.doctorService.getAll(),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.doctorService.delete(id);
    return toResponse('doctor deleted successfully');
  }
}
