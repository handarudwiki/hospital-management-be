import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentItemDto } from './dto/create_payment_item.dto';
import {
  PaymentItemResponse,
  toPaymentItemResponse,
} from './response/payment_item.response';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePaymentItemDto } from './dto/updtae_payment_item.dto';

@Injectable()
export class PaymentItemService {
  constructor(private prisma: PrismaService) {}

  async validateIsDoctorExist(doctorId: number) {
    try {
      const doctor = await this.prisma.user.findUnique({
        where: {
          id: doctorId,
          role: 'doctor',
        },
      });

      if (!doctor) {
        throw new NotFoundException('Doctor not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validatePaymentItemExists(paymentItemId: number): Promise<any> {
    try {
      const paymentItem = await this.prisma.paymentItem.findUnique({
        where: {
          id: paymentItemId,
        },
        include: {
          doctor: true,
        },
      });

      if (!paymentItem) {
        throw new NotFoundException('PaymentItem not found');
      }

      return paymentItem;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createDto: CreatePaymentItemDto): Promise<PaymentItemResponse> {
    try {
      await this.validateIsDoctorExist(createDto.doctor_id);

      const paymentItem = await this.prisma.paymentItem.create({
        data: {
          doctor_id: createDto.doctor_id,
          code: createDto.code,
          name: createDto.name,
          type: createDto.type,
          price: createDto.price,
          commission: createDto.commission,
          quantity: createDto.quantity,
        },
        include: {
          doctor: true,
        },
      });

      return toPaymentItemResponse(paymentItem);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdatePaymentItemDto,
  ): Promise<PaymentItemResponse> {
    try {
      await this.validatePaymentItemExists(id);

      if (updateDto.doctor_id) {
        console.log('ok');
        await this.validateIsDoctorExist(updateDto.doctor_id);
      }

      const paymentItem = await this.prisma.paymentItem.update({
        where: {
          id,
        },
        data: {
          name: updateDto.name,
          doctor_id: updateDto.doctor_id,
          code: updateDto.code,
          type: updateDto.type,
          price: updateDto.price,
          commission: updateDto.commission,
          quantity: updateDto.quantity,
        },
        include: {
          doctor: true,
        },
      });

      return toPaymentItemResponse(paymentItem);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    await this.validatePaymentItemExists(id);
    await this.prisma.paymentItem.delete({
      where: {
        id,
      },
    });
  }
  async getOne(id: number): Promise<PaymentItemResponse> {
    const paymentItem = await this.validatePaymentItemExists(id);
    return toPaymentItemResponse(paymentItem);
  }

  async getAll(): Promise<PaymentItemResponse[]> {
    const paymentItems = await this.prisma.paymentItem.findMany({
      include: { doctor: true },
    });

    return paymentItems.map((item) => {
      return toPaymentItemResponse(item);
    });
  }
}
