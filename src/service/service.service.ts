import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create_service.dto';
import {
  ServiceResponse,
  toServiceResponse,
} from './response/service.response';
import { Service } from '@prisma/client';
import { UpdateServiceDto } from './dto/update_service.dto';

@Injectable()
export class ServiceService {
  constructor(private prismaService: PrismaService) {}

  async validateDepartmentExist(departmentId: number) {
    try {
      const department = await this.prismaService.department.findUnique({
        where: { id: departmentId },
      });

      if (!department) {
        throw new InternalServerErrorException('service not found');
      }

      return department;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateServiceExist(serviceId: number): Promise<Service> {
    try {
      const service = await this.prismaService.service.findUnique({
        where: { id: serviceId },
        include: {
          department: true,
        },
      });

      if (!service) {
        throw new InternalServerErrorException('service not found');
      }

      return service;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createDto: CreateServiceDto): Promise<ServiceResponse> {
    try {
      await this.validateDepartmentExist(createDto.department_id);
      const service = await this.prismaService.service.create({
        data: {
          name: createDto.name,
          charge: createDto.charge,
          department_id: createDto.department_id,
          doctor_commission: createDto.doctor_commission,
        },
        include: {
          department: true,
        },
      });

      return toServiceResponse(service);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdateServiceDto,
  ): Promise<ServiceResponse> {
    try {
      await this.validateServiceExist(id);

      if (updateDto.department_id) {
        await this.validateDepartmentExist(updateDto.department_id);
      }

      const service = await this.prismaService.service.update({
        where: { id },
        data: {
          name: updateDto.name,
          charge: updateDto.charge,
          department_id: updateDto.department_id,
          doctor_commission: updateDto.doctor_commission,
        },
        include: {
          department: true,
        },
      });

      return toServiceResponse(service);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
      await this.validateServiceExist(id);

      await this.prismaService.service.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOne(id: number): Promise<ServiceResponse> {
    try {
      const service = await this.validateServiceExist(id);

      return toServiceResponse(service);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<ServiceResponse[]> {
    try {
      const services = await this.prismaService.service.findMany({
        include: {
          department: true,
        },
      });

      return services.map((service) => toServiceResponse(service));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
