import { Injectable, NotFoundException } from '@nestjs/common';
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
    const separtment = await this.prisma.department.create({
      data: createDto,
    });

    return toDepartmentResponse(separtment);
  }

  async findAll(): Promise<DepartmentResponse[]> {
    const departments = await this.prisma.department.findMany();
    return departments.map((department) => toDepartmentResponse(department));
  }

  async findOne(id: number): Promise<DepartmentResponse> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return toDepartmentResponse(department);
  }

  async update(
    id: number,
    updateDto: updateDepartmentDto,
  ): Promise<DepartmentResponse> {
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
  }

  async remove(id: number): Promise<string> {
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
  }
}
