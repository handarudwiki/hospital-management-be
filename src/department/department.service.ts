import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createDepartmentDto } from './dto/create_department.dto';
import {
  DepartmentResponse,
  toDepartmentResponse,
} from './response/department.response';
import { updateDepartmentDto } from './dto/update_department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: createDepartmentDto): Promise<DepartmentResponse> {
    try {
      const separtment = await this.prisma.department.create({
        data: createDto,
      });

      return toDepartmentResponse(separtment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<DepartmentResponse[]> {
    try {
      const departments = await this.prisma.department.findMany();
      return departments.map((department) => toDepartmentResponse(department));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<DepartmentResponse> {
    try {
      const department = await this.prisma.department.findUnique({
        where: { id },
      });

      if (!department) {
        throw new NotFoundException('Department not found');
      }
      return toDepartmentResponse(department);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: updateDepartmentDto,
  ): Promise<DepartmentResponse> {
    try {
      const isDepartmentExist = await this.prisma.department.findUnique({
        where: { id },
      });
      if (!isDepartmentExist) {
        throw new NotFoundException('Department not found');
      }

      const department = await this.prisma.department.update({
        where: { id },
        data: updateDto,
      });

      return toDepartmentResponse(department);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      const isDepartmentExist = await this.prisma.department.findUnique({
        where: { id },
      });
      // console.log(id);
      if (!isDepartmentExist) {
        throw new NotFoundException('Department not found');
      }
      await this.prisma.department.delete({
        where: { id },
      });

      return 'Department deleted successfully';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
