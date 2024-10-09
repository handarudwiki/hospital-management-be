import { Injectable, NotFoundException } from '@nestjs/common';
import {
  MedicinCategoryResponse,
  toMedicineCategoryResponse,
} from './response/medicine_category.response';
import CreateMedicineCategoryDto from './dto/create_medicine_category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import UpdateMedicineCategoryDto from './dto/udpate_medicine_category.dto';

@Injectable()
export class MedicineCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateMedicineCategoryDto,
  ): Promise<MedicinCategoryResponse> {
    const medicineCategory = await this.prisma.medicineCatgory.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return toMedicineCategoryResponse(medicineCategory);
  }

  async findAll(): Promise<MedicinCategoryResponse[]> {
    const medicineCategories = await this.prisma.medicineCatgory.findMany();
    return medicineCategories.map((medicineCategory) =>
      toMedicineCategoryResponse(medicineCategory),
    );
  }

  async findOne(id: number): Promise<MedicinCategoryResponse> {
    const medicineCategory = await this.prisma.medicineCatgory.findUnique({
      where: {
        id,
      },
    });

    if (!medicineCategory) {
      return null;
    }

    return toMedicineCategoryResponse(medicineCategory);
  }

  async update(
    id: number,
    data: UpdateMedicineCategoryDto,
  ): Promise<MedicinCategoryResponse> {
    const isMedicineCategoryExist =
      await this.prisma.medicineCatgory.findUnique({
        where: {
          id,
        },
      });
    if (!isMedicineCategoryExist) {
      throw new NotFoundException('Medicine category not found');
    }
    const medicineCategory = await this.prisma.medicineCatgory.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return toMedicineCategoryResponse(medicineCategory);
  }

  async delete(id: number) {
    const isMedicineCategoryExist =
      await this.prisma.medicineCatgory.findUnique({
        where: {
          id,
        },
      });
    if (!isMedicineCategoryExist) {
      throw new NotFoundException('Medicine category not found');
    }

    await this.prisma.medicineCatgory.delete({
      where: {
        id,
      },
    });
  }
}
