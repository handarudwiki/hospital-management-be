import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLapTemplateDto } from './dto/create_lap_template.dto';
import {
  LapTemplateResponse,
  toLabTemplateResponse,
} from './response/lap_template.response';
import { UpdateLapTemplateDto } from './dto/update_lap_template.dto';

@Injectable()
export class LapTemplateService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateLapTemplateDto): Promise<LapTemplateResponse> {
    const lapTemplate = await this.prisma.lapTemplate.create({
      data: {
        name: createDto.name,
        template: createDto.template,
      },
    });

    return toLabTemplateResponse(lapTemplate);
  }

  async findAll(): Promise<LapTemplateResponse[]> {
    const lapTemplates = await this.prisma.lapTemplate.findMany();
    return lapTemplates.map((lapTemplate) =>
      toLabTemplateResponse(lapTemplate),
    );
  }

  async findOne(id: number): Promise<LapTemplateResponse> {
    await this.validateTemplateExist(id);
    const lapTemplate = await this.prisma.lapTemplate.findUnique({
      where: {
        id,
      },
    });

    return toLabTemplateResponse(lapTemplate);
  }

  async update(
    id: number,
    createDto: UpdateLapTemplateDto,
  ): Promise<LapTemplateResponse> {
    await this.validateTemplateExist(id);
    const lapTemplate = await this.prisma.lapTemplate.update({
      where: {
        id,
      },
      data: {
        name: createDto.name,
        template: createDto.template,
      },
    });

    return toLabTemplateResponse(lapTemplate);
  }

  async remove(id: number) {
    await this.validateTemplateExist(id);
    await this.prisma.lapTemplate.delete({
      where: {
        id,
      },
    });
  }

  async validateTemplateExist(id: number) {
    const lapTemplate = await this.prisma.lapTemplate.findUnique({
      where: {
        id,
      },
    });

    if (!lapTemplate) {
      throw new NotFoundException('Lap template not found');
    }

    return lapTemplate;
  }
}
