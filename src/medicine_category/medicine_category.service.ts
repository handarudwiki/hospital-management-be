import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const medicineCategory = await this.prisma.medicineCatgory.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });

      return toMedicineCategoryResponse(medicineCategory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<MedicinCategoryResponse[]> {
    try {
      const medicineCategories = await this.prisma.medicineCatgory.findMany();
      return medicineCategories.map((medicineCategory) =>
        toMedicineCategoryResponse(medicineCategory),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<MedicinCategoryResponse> {
    try {
      const medicineCategory = await this.prisma.medicineCatgory.findUnique({
        where: {
          id,
        },
      });

      if (!medicineCategory) {
        return null;
      }

      return toMedicineCategoryResponse(medicineCategory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    data: UpdateMedicineCategoryDto,
  ): Promise<MedicinCategoryResponse> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
