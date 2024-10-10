import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLapReportDto } from './dto/create_lap_report.dto';
import {
  LapReportResponse,
  toLabReportResponse,
} from './response/lap_report.rersponse';
import { PrismaService } from 'src/prisma/prisma.service';
import { LapReport } from '@prisma/client';
import { UdpateLapReportDto } from './dto/update_lap_report.dto';

@Injectable()
export class LapReportService {
  constructor(private prisma: PrismaService) {}

  async validatePatientMustExist(patient_id: number) {
    const patient = await this.prisma.user.findUnique({
      where: {
        id: patient_id,
        role: 'patient',
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  }

  async validateDoctorMustExist(doctor_id: number) {
    const doctor = await this.prisma.user.findUnique({
      where: {
        id: doctor_id,
        role: 'doctor',
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
  }

  async validateTemplateMustExist(template_id: number) {
    const template = await this.prisma.lapTemplate.findUnique({
      where: {
        id: template_id,
      },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }
  }

  async validateIdMustExist(
    patient_id: number,
    doctor_id: number,
    template_id: number,
  ) {
    await Promise.all([
      this.validatePatientMustExist(patient_id),
      this.validateDoctorMustExist(doctor_id),
      this.validateTemplateMustExist(template_id),
    ]);
  }

  async create(createDto: CreateLapReportDto): Promise<LapReportResponse> {
    await this.validateIdMustExist(
      createDto.patient_id,
      createDto.doctor_id,
      createDto.template_id,
    );
    const labReport = await this.prisma.lapReport.create({
      data: {
        patient_id: createDto.patient_id,
        doctor_id: createDto.doctor_id,
        template_id: createDto.template_id,
        report: createDto.report,
        date: new Date(createDto.date),
        time: createDto.time,
      },
      include: {
        template: true,
        patient: true,
        doctor: true,
      },
    });

    return toLabReportResponse(labReport);
  }

  async validateLabReportMustExist(labReport_id: number): Promise<LapReport> {
    const labReport = await this.prisma.lapReport.findUnique({
      where: {
        id: labReport_id,
      },
    });

    if (!labReport) {
      throw new NotFoundException('Lab report not found');
    }

    return labReport;
  }

  async findAll(): Promise<LapReportResponse[]> {
    const labReports = await this.prisma.lapReport.findMany({
      include: {
        template: true,
        patient: true,
        doctor: true,
      },
    });
    return labReports.map((labReport) => toLabReportResponse(labReport));
  }

  async findOne(id: number): Promise<LapReportResponse> {
    await this.validateLabReportMustExist(id);
    const labReport = await this.prisma.lapReport.findUnique({
      where: {
        id,
      },

      include: {
        template: true,
        patient: true,
        doctor: true,
      },
    });

    return toLabReportResponse(labReport);
  }

  async update(
    id: number,
    updateDto: UdpateLapReportDto,
  ): Promise<LapReportResponse> {
    const labReportExist = await this.validateLabReportMustExist(id);
    if (updateDto.patient_id) {
      await this.validatePatientMustExist(updateDto.patient_id);
    }

    if (updateDto.doctor_id) {
      await this.validateDoctorMustExist(updateDto.doctor_id);
    }
    if (updateDto.template_id) {
      await this.validateTemplateMustExist(updateDto.template_id);
    }
    const labReport = await this.prisma.lapReport.update({
      where: {
        id,
      },
      data: {
        patient_id: updateDto.patient_id,
        doctor_id: updateDto.doctor_id,
        template_id: updateDto.template_id,
        report: updateDto.report,
        date: updateDto.date ? new Date(updateDto.date) : labReportExist.date,
        time: updateDto.time,
      },
      include: {
        template: true,
        patient: true,
        doctor: true,
      },
    });

    return toLabReportResponse(labReport);
  }

  async remove(id: number) {
    await this.validateLabReportMustExist(id);
    await this.prisma.lapReport.delete({
      where: {
        id,
      },
    });
  }
}
