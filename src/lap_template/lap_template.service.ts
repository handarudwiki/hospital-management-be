import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const lapTemplate = await this.prisma.lapTemplate.create({
        data: {
          name: createDto.name,
          template: createDto.template,
        },
      });

      return toLabTemplateResponse(lapTemplate);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<LapTemplateResponse[]> {
    try {
      const lapTemplates = await this.prisma.lapTemplate.findMany();
      return lapTemplates.map((lapTemplate) =>
        toLabTemplateResponse(lapTemplate),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<LapTemplateResponse> {
    try {
      await this.validateTemplateExist(id);
      const lapTemplate = await this.prisma.lapTemplate.findUnique({
        where: {
          id,
        },
      });

      return toLabTemplateResponse(lapTemplate);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    createDto: UpdateLapTemplateDto,
  ): Promise<LapTemplateResponse> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      await this.validateTemplateExist(id);
      await this.prisma.lapTemplate.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateTemplateExist(id: number) {
    try {
      const lapTemplate = await this.prisma.lapTemplate.findUnique({
        where: {
          id,
        },
      });

      if (!lapTemplate) {
        throw new NotFoundException('Lap template not found');
      }

      return lapTemplate;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
