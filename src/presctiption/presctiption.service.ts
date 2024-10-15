import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePrescriptionDto } from './dto/create_prescription.dto';
import {
  PrescriptionResponse,
  toPrescriptionResponse,
} from './response/prescription_response';
import { UpdatePrescriptionDto } from './dto/update_presciption.dto';
import { Prescription } from '@prisma/client';

@Injectable()
export class PresctiptionService {
  constructor(private prismaService: PrismaService) {}

  async validateDoctorExist(doctorId: number) {
    try {
      const doctot = await this.prismaService.user.findUnique({
        where: { id: doctorId, role: 'doctor' },
      });

      if (!doctot) {
        throw new NotFoundException(`doctor not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validatePatientExist(patientId: number) {
    try {
      const patient = await this.prismaService.user.findUnique({
        where: { id: patientId, role: 'patient' },
      });

      if (!patient) {
        throw new NotFoundException(`patient not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validatePresciptionExist(presciptionId: number): Promise<Prescription> {
    try {
      const prescription = await this.prismaService.prescription.findUnique({
        where: {
          id: presciptionId,
        },
        include: {
          doctor: true,
          patient: true,
          medicinePrescriptions: {
            include: {
              medicine: true,
            },
          },
        },
      });

      if (!prescription) {
        throw new NotFoundException(`prescription not found`);
      }
      return prescription;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateMedicineExist(medicineId: number) {
    try {
      const medicine = await this.prismaService.medicine.findUnique({
        where: { id: medicineId },
      });

      if (!medicine) {
        throw new NotFoundException(`medicine not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(
    createDto: CreatePrescriptionDto,
  ): Promise<PrescriptionResponse> {
    try {
      Promise.all([
        await this.validateDoctorExist(createDto.doctor_id),
        await this.validatePatientExist(createDto.patient_id),
      ]);

      const presciption = await this.prismaService.prescription.create({
        data: {
          doctor_id: createDto.doctor_id,
          patient_id: createDto.patient_id,
          blood_pressure: createDto.blood_pressure,
          diabetes: createDto.diabetes,
          symptoms: createDto.symptoms,
          advice: createDto.advice,
          diagnosis: createDto.diagnosis,
          date: new Date(createDto.date),
          medicinePrescriptions: {
            create: createDto.medicines.map((medicine) => ({
              medicine_id: medicine.medicine_id,
              instructions: medicine.instruction,
            })),
          },
        },
        include: {
          patient: true,
          doctor: true,
          medicinePrescriptions: {
            include: {
              medicine: true,
            },
          },
        },
      });

      return toPrescriptionResponse(presciption);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdatePrescriptionDto,
  ): Promise<PrescriptionResponse> {
    try {
      const presciption = await this.validatePresciptionExist(id);

      if (updateDto.patient_id) {
        await this.validatePatientExist(updateDto.patient_id);
      }

      if (updateDto.doctor_id) {
        await this.validateDoctorExist(updateDto.doctor_id);
      }

      const updatedPresciption = await this.prismaService.prescription.update({
        where: { id },
        data: {
          doctor_id: updateDto.doctor_id,
          patient_id: updateDto.patient_id,
          blood_pressure: updateDto.blood_pressure,
          diabetes: updateDto.diabetes,
          symptoms: updateDto.symptoms,
          advice: updateDto.advice,
          diagnosis: updateDto.diagnosis,
          date: updateDto.date ? new Date(updateDto.date) : presciption.date,
          medicinePrescriptions: updateDto.medicines && {
            deleteMany: {},
            create: updateDto.medicines.map((medicine) => ({
              medicine_id: medicine.medicine_id,
              instructions: medicine.instruction,
            })),
          },
        },
        include: {
          doctor: true,
          patient: true,
          medicinePrescriptions: {
            include: {
              medicine: true,
            },
          },
        },
      });

      return toPrescriptionResponse(updatedPresciption);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    try {
      await this.validatePresciptionExist(id);

      await this.prismaService.medicinePrescription.deleteMany({
        where: { prescription_id: id },
      });
      await this.prismaService.prescription.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getOne(id: number): Promise<PrescriptionResponse> {
    try {
      const presciption = await this.validatePresciptionExist(id);

      return toPrescriptionResponse(presciption);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<PrescriptionResponse[]> {
    try {
      const presciptions = await this.prismaService.prescription.findMany({
        include: {
          doctor: true,
          patient: true,
          medicinePrescriptions: {
            include: {
              medicine: true,
            },
          },
        },
      });

      return presciptions.map((presciption) =>
        toPrescriptionResponse(presciption),
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
