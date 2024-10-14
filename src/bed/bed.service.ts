import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBedDto } from './dto/create_bed.dto';
import { BedResponse, toBedResponse } from './response/bed.response';

@Injectable()
export class BedService {
  constructor(private prisma: PrismaService) {}

  async validateDepartmentIdExist(departmentId: number) {
    const department = await this.prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }
  }

  async validateCodeUnique(code: string) {
    const bed = await this.prisma.bed.findUnique({
      where: {
        code,
      },
    });

    if (bed) {
      throw new BadRequestException('Bed code already exist');
    }
  }

  async create(createDto: CreateBedDto): Promise<BedResponse> {
    try {
      await this.validateDepartmentIdExist(createDto.department_id);
      await this.validateCodeUnique(createDto.code);

      const bed = await this.prisma.bed.create({
        data: {
          code: createDto.code,
          department_id: createDto.department_id,
          status: createDto.status,
          notes: createDto.notes,
        },
        include: {
          department: true,
        },
      });

      return toBedResponse(bed);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateDto: CreateBedDto): Promise<BedResponse> {
    try {
      if (updateDto.department_id) {
        await this.validateDepartmentIdExist(updateDto.department_id);
      }
      if (updateDto.code) {
        await this.validateCodeUnique(updateDto.code);
      }

      const isBedExist = await this.prisma.bed.findUnique({
        where: {
          id,
        },
      });

      if (!isBedExist) {
        throw new NotFoundException('Bed not found');
      }

      const bed = await this.prisma.bed.update({
        where: {
          id,
        },
        data: {
          code: updateDto.code,
          department_id: updateDto.department_id,
          status: updateDto.status,
          notes: updateDto.notes,
        },
        include: {
          department: true,
        },
      });

      return toBedResponse(bed);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
      const bed = await this.prisma.bed.findUnique({
        where: { id },
      });

      if (!bed) {
        throw new NotFoundException('Bed not found');
      }

      await this.prisma.bed.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: number): Promise<BedResponse> {
    try {
      const bed = await this.prisma.bed.findUnique({
        where: { id },
        include: { department: true },
      });

      if (!bed) {
        throw new NotFoundException('Bed not found');
      }

      return toBedResponse(bed);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<BedResponse[]> {
    try {
      const bedAllodments = await this.prisma.bedAllodment.findMany();

      for (const bedAllodment of bedAllodments) {
        const startDateTime = new Date(
          `${bedAllodment.start_date} ${bedAllodment.start_time}`,
        );
        const endDateTime = new Date(
          `${bedAllodment.end_date} ${bedAllodment.end_time}`,
        );

        if (startDateTime < new Date() && endDateTime > new Date()) {
          await this.prisma.bedAllodment.update({
            where: { id: bedAllodment.id },
            data: { status: 'in allotment' },
          });

          await this.prisma.bed.update({
            where: { id: bedAllodment.bed_id },
            data: { status: 'in allotment' },
          });
        } else if (startDateTime < new Date() && endDateTime < new Date()) {
          await this.prisma.bedAllodment.update({
            where: { id: bedAllodment.id },
            data: { status: 'completed' },
          });

          await this.prisma.bed.update({
            where: { id: bedAllodment.bed_id },
            data: { status: 'available' },
          });
        } else {
          await this.prisma.bedAllodment.update({
            where: { id: bedAllodment.id },
            data: { status: 'in coming' },
          });

          await this.prisma.bed.update({
            where: { id: bedAllodment.bed_id },
            data: { status: 'available' },
          });
        }
      }
      const beds = await this.prisma.bed.findMany({
        include: { department: true },
      });

      console.log(beds);
      return beds.map(toBedResponse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
