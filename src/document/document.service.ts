import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create_document.dto';
import {
  DocumentResponse,
  toDocumentResponse,
} from './response/document.response';
import { UpdateDocumentDto } from './dto/update_document.dto';
import { Document } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(private prismaService: PrismaService) {}

  async validateDoctorExist(doctorId: number) {
    try {
      const doctor = await this.prismaService.user.findUnique({
        where: {
          id: doctorId,
          role: 'doctor',
        },
      });
      if (!doctor) {
        throw new NotFoundException(`doctor not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async validatePatientExist(patientId: number) {
    try {
      const patient = await this.prismaService.user.findUnique({
        where: {
          id: patientId,
          role: 'patient',
        },
      });
      if (!patient) {
        throw new NotFoundException(`patient not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateDocumentExist(documentId: number): Promise<Document> {
    try {
      const document = await this.prismaService.document.findUnique({
        where: {
          id: documentId,
        },
        include: {
          doctor: true,
          patient: true,
        },
      });
      if (!document) {
        throw new NotFoundException(`document not found`);
      }

      return document;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(createDto: CreateDocumentDto): Promise<DocumentResponse> {
    try {
      Promise.all([
        await this.validatePatientExist(createDto.patient_id),
        await this.validateDoctorExist(createDto.doctor_id),
      ]);

      const document = await this.prismaService.document.create({
        data: {
          patient_id: createDto.patient_id,
          doctor_id: createDto.doctor_id,
          date: new Date(createDto.date),
          description: createDto.description,
          doc: createDto.doc,
          status: createDto.status,
        },
        include: {
          doctor: true,
          patient: true,
        },
      });

      return toDocumentResponse(document);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdateDocumentDto,
  ): Promise<DocumentResponse> {
    try {
      const document = await this.validateDocumentExist(id);
      if (updateDto.patient_id) {
        await this.validatePatientExist(updateDto.patient_id);
      }

      if (updateDto.doctor_id) {
        await this.validateDoctorExist(updateDto.doctor_id);
      }

      const updatedDocument = await this.prismaService.document.update({
        where: {
          id,
        },
        data: {
          patient_id: updateDto.patient_id,
          doctor_id: updateDto.doctor_id,
          date: updateDto.date ? new Date(updateDto.date) : document.date,
          description: updateDto.description,
          doc: updateDto.doc,
          status: updateDto.status,
        },
        include: {
          patient: true,
          doctor: true,
        },
      });

      return toDocumentResponse(updatedDocument);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOne(id: number): Promise<DocumentResponse> {
    try {
      const document = await this.validateDocumentExist(id);

      return toDocumentResponse(document);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(): Promise<DocumentResponse[]> {
    try {
      const documents = await this.prismaService.document.findMany({
        include: {
          doctor: true,
          patient: true,
        },
      });

      return documents.map((document) => toDocumentResponse(document));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number) {
    await this.validateDocumentExist(id);
    await this.prismaService.document.delete({
      where: { id: id },
    });
  }
}
