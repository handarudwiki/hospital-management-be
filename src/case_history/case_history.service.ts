import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCaseHistoryDto } from './dto/create_case_history.dto';
import {
  CaseHistoryResponse,
  toCaseHistoryResponse,
} from './response/case_history.response';
import { CaseHistory } from '@prisma/client';
import { UpdateCaseHistoryDto } from './dto/update_case_history.dto';

@Injectable()
export class CaseHistoryService {
  constructor(private prismaservice: PrismaService) {}

  async validatePatientExist(patientId: number) {
    try {
      const patient = await this.prismaservice.user.findUnique({
        where: { id: patientId, role: 'patient' },
      });

      if (!patient) {
        throw new NotFoundException('patient not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateCaseHistoryExist(caseHistoryId: number): Promise<CaseHistory> {
    try {
      const caseHistory = await this.prismaservice.caseHistory.findUnique({
        where: { id: caseHistoryId },
        include: {
          patient: true,
        },
      });

      if (!caseHistory) {
        throw new NotFoundException('case history not found');
      }

      return caseHistory;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createDto: CreateCaseHistoryDto): Promise<CaseHistoryResponse> {
    try {
      await this.validatePatientExist(createDto.patient_id);
      const caseHistory = await this.prismaservice.caseHistory.create({
        data: {
          date: new Date(createDto.date),
          title: createDto.title,
          food_allergies: createDto.food_allergies,
          bleed_tendency: createDto.bleed_tendency,
          heart_disease: createDto.heart_disease,
          blood_preasure: createDto.blood_pressure,
          diabetic: createDto.diabetic,
          surgery: createDto.surgery,
          accident: createDto.accident,
          family_medical_history: createDto.family_medical_history,
          current_medication: createDto.current_medication,
          female_pregnancy: createDto.female_prenancy,
          breast_feeding: createDto.breast_feeding,
          reference: createDto.reference,
          status: createDto.status,
          low_income: createDto.low_income,
          others: createDto.others,
          patient_id: createDto.patient_id,
          health_insurance: createDto.health_insurance,
        },
        include: {
          patient: true,
        },
      });
      return toCaseHistoryResponse(caseHistory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdateCaseHistoryDto,
  ): Promise<CaseHistoryResponse> {
    try {
      const caseHistory = await this.validateCaseHistoryExist(id);

      if (updateDto.patient_id) {
        await this.validatePatientExist(updateDto.patient_id);
      }

      const updatedCaseHistory = await this.prismaservice.caseHistory.update({
        where: {
          id,
        },
        data: {
          accident: updateDto.accident,
          blood_preasure: updateDto.blood_pressure,
          breast_feeding: updateDto.breast_feeding,
          current_medication: updateDto.current_medication,
          date: updateDto.date ? new Date(updateDto.date) : caseHistory.date,
          diabetic: updateDto.diabetic,
          family_medical_history: updateDto.family_medical_history,
          bleed_tendency: updateDto.bleed_tendency,
          food_allergies: updateDto.food_allergies,
          heart_disease: updateDto.heart_disease,
          surgery: updateDto.surgery,
          female_pregnancy: updateDto.female_prenancy,
          health_insurance: updateDto.health_insurance,
          low_income: updateDto.low_income,
          others: updateDto.others,
          reference: updateDto.reference,
          status: updateDto.status,
          patient_id: updateDto.patient_id,
          title: updateDto.title,
        },
        include: {
          patient: true,
        },
      });

      return toCaseHistoryResponse(updatedCaseHistory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
      await this.validateCaseHistoryExist(id);

      await this.prismaservice.caseHistory.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOne(id: number): Promise<CaseHistoryResponse> {
    try {
      const caseHistory = await this.validateCaseHistoryExist(id);

      return toCaseHistoryResponse(caseHistory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<CaseHistoryResponse[]> {
    try {
      const caseHistories = await this.prismaservice.caseHistory.findMany({
        include: {
          patient: true,
        },
      });

      return caseHistories.map((caseHistory) =>
        toCaseHistoryResponse(caseHistory),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
