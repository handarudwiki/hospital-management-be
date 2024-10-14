import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreaBedAllodMent } from './dto/create_bed_allodment';
import {
  BedAllodmentResponse,
  toBedAllodmentResponse,
} from './response/bed_allodment.response';

@Injectable()
export class BedAllodmentService {
  constructor(private prisma: PrismaService) {}

  async validatePatientExists(patient_id: number) {
    const patient = await this.prisma.user.findFirst({
      where: {
        id: patient_id,
        role: 'patient',
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  }

  async validateBedExists(bed_id: number) {
    const bed = await this.prisma.bed.findFirst({
      where: {
        id: bed_id,
      },
    });

    if (!bed) {
      throw new NotFoundException('Bed not found');
    }
  }

  async validateMustExist(patient_id: number, bed_id: number) {
    await this.validatePatientExists(patient_id);
    await this.validateBedExists(bed_id);
  }

  async create(data: CreaBedAllodMent): Promise<BedAllodmentResponse> {
    try {
      await this.validateMustExist(data.patient_id, data.bed_id);
      const bedAllodment = await this.prisma.bedAllodment.create({
        data: {
          patient_id: data.patient_id,
          bed_id: data.bed_id,
          start_time: data.start_time,
          end_time: data.end_time,
          start_date: new Date(data.start_date),
          end_date: new Date(data.end_date),
          status: 'in coming',
        },
      });

      return toBedAllodmentResponse(bedAllodment);
    } catch (error) {
      throw new InternalServerErrorException(data);
    }
  }

  async findAll(): Promise<BedAllodmentResponse[]> {
    try {
      const bedAllodments = await this.prisma.bedAllodment.findMany();
      return bedAllodments.map((bedAllodment) =>
        toBedAllodmentResponse(bedAllodment),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<BedAllodmentResponse> {
    try {
      const isBadAllodmentExist = await this.prisma.bedAllodment.findUnique({
        where: { id },
      });

      if (!isBadAllodmentExist) {
        throw new NotFoundException('Bed Allodment not found');
      }

      const bedAllodment = await this.prisma.bedAllodment.findUnique({
        where: { id },
      });
      if (!bedAllodment) {
        throw new NotFoundException('Bed Allodment not found');
      }
      return toBedAllodmentResponse(bedAllodment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    data: CreaBedAllodMent,
  ): Promise<BedAllodmentResponse> {
    try {
      if (data.patient_id) {
        await this.validatePatientExists(data.patient_id);
      }

      if (data.bed_id) {
        await this.validateBedExists(data.bed_id);
      }
      const isBedAllodmentExist = await this.prisma.bedAllodment.findUnique({
        where: { id },
      });

      if (!isBedAllodmentExist) {
        throw new NotFoundException('Bed Allodment not found');
      }

      const bedAllodment = await this.prisma.bedAllodment.update({
        where: { id },
        data: {
          patient_id: data.patient_id,
          bed_id: data.bed_id,
          start_time: data.start_time,
          end_time: data.end_time,
          start_date: new Date(data.start_date),
          end_date: new Date(data.end_date),
        },
      });
      return toBedAllodmentResponse(bedAllodment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const isBedAllodmentExist = await this.prisma.bedAllodment.findUnique({
        where: { id },
      });

      if (!isBedAllodmentExist) {
        throw new NotFoundException('Bed Allodment not found');
      }

      await this.prisma.bedAllodment.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
