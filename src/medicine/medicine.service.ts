import { CreateMedicineDto } from './dto/create_medicine.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  MedicineResponse,
  toMedicineResponse,
} from './response/medicine.response';
import { UpdateMedicineDto } from './dto/udpate_medicine.dto';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  async validateCategoryExist(categoryId: number) {
    try {
      console.log(categoryId);
      const category = await this.prisma.medicineCatgory.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!category) {
        throw new BadRequestException('Category not found');
      }

      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(data: CreateMedicineDto): Promise<MedicineResponse> {
    try {
      await this.validateCategoryExist(data.category_id);
      const medicine = await this.prisma.medicine.create({
        data: {
          name: data.name,
          instruction: data.instruction,
          sale_price: data.sale_price,
          category_id: data.category_id,
          company: data.company,
          purchase_price: data.purchase_price,
          expire_date: new Date(data.expire_date),
          quantity: data.quantity,
        },
        include: {
          category: true,
        },
      });

      return toMedicineResponse(medicine);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<MedicineResponse[]> {
    try {
      const medicines = await this.prisma.medicine.findMany({
        include: {
          category: true,
        },
      });

      return medicines.map((medicine) => toMedicineResponse(medicine));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<MedicineResponse> {
    try {
      const isMedicineExist = await this.prisma.medicine.findUnique({
        where: {
          id,
        },
      });

      if (!isMedicineExist) {
        throw new BadRequestException('Medicine not found');
      }
      const medicine = await this.prisma.medicine.findUnique({
        where: {
          id,
        },
        include: {
          category: true,
        },
      });

      return toMedicineResponse(medicine);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, data: UpdateMedicineDto): Promise<MedicineResponse> {
    try {
      const isMedicineExist = await this.prisma.medicine.findUnique({
        where: {
          id,
        },
      });

      if (!isMedicineExist) {
        throw new BadRequestException('Medicine not found');
      }
      if (data.category_id) {
        await this.validateCategoryExist(data.category_id);
      }
      const medicine = await this.prisma.medicine.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          instruction: data.instruction,
          sale_price: data.sale_price,
          category_id: data.category_id,
          company: data.company,
          purchase_price: data.purchase_price,
          expire_date: data.expire_date
            ? new Date(data.expire_date)
            : isMedicineExist.expire_date,
          quantity: data.quantity,
        },
        include: {
          category: true,
        },
      });

      return toMedicineResponse(medicine);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
      const isMedicineExist = await this.prisma.medicine.findUnique({
        where: {
          id,
        },
      });
      if (!isMedicineExist) {
        throw new BadRequestException('Medicine not found');
      }
      await this.prisma.medicine.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
