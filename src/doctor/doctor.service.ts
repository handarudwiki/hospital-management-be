import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dto/create_doctor.dto';
import { hash } from 'bcryptjs';
import { DoctorResponse, toDoctorResponse } from './response/doctor.response';
import { UpdateDoctorDto } from './dto/update_doctot.dto';
import { deleteFile, generateFilepath } from 'src/helpers/FIle';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateDoctorDto,
    file: Express.Multer.File,
  ): Promise<DoctorResponse> {
    const isDoctorExist = await this.findByEmail(data.email);
    if (isDoctorExist) {
      throw new ConflictException('Doctor already exist');
    }

    if (!file) {
      throw new BadRequestException('Pleade upload picture');
    }

    const picturePath = generateFilepath('doctors', file.filename);

    const doctor = await this.prisma.user.create({
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: await hash(data.password, 10),
        birth_date: data.birth_date,
        role: 'doctor',
        address: data.address,
        phone: data.phone,
        mobile: data.mobile,
        emergency: data.emergency,
        medical_degree: data.medical_degree,
        specialist: data.specialist,
        biography: data.biography,
        blood_group: data.blood_group,
        educational_qualification: data.education_qualification,
        gender: data.gender as any,
        picture: picturePath,
      },
    });

    return toDoctorResponse(doctor);
  }

  async update(
    id: number,
    updateDto: UpdateDoctorDto,
    file: Express.Multer.File,
  ): Promise<DoctorResponse> {
    const isDoctorExist = await this.findById(id);
    if (!isDoctorExist) {
      throw new NotFoundException('Doctor not found');
    }
    let picturePath;
    if (file) {
      picturePath = generateFilepath('doctors', file.filename);
    }

    if (picturePath) {
      await deleteFile(`/public/${isDoctorExist.picture}`);
    }

    const doctor = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateDto,
        gender: updateDto.gender as any,
        picture: picturePath,
        birth_date: updateDto.birth_date,
      },
      include: { departmentUsers: { include: { department: true } } },
    });

    return toDoctorResponse(doctor);
  }

  async delete(id: number) {
    const doctor = await this.findById(id);

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    if (doctor.picture) {
      await deleteFile(`/public/${doctor.picture}`);
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findById(id: number): Promise<DoctorResponse> {
    const doctor = await this.prisma.user.findUnique({
      where: { id, role: 'doctor' },
      include: { departmentUsers: { include: { department: true } } },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return toDoctorResponse(doctor);
  }

  async getAll(): Promise<DoctorResponse[]> {
    const doctors = await this.prisma.user.findMany({
      where: { role: 'doctor' },
      include: { departmentUsers: { include: { department: true } } },
    });

    return doctors.map(toDoctorResponse);
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email, role: 'doctor' },
      include: { departmentUsers: { include: { department: true } } },
    });
  }
}
