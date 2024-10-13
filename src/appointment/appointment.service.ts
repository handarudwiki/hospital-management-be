import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create_appointment.dto';
import {
  AppointmentResponse,
  toAppointmentResponse,
} from './response/appointmen_response';
import { Appointment, User } from '@prisma/client';
import { UpdaeteAppointmentDto } from './dto/update_appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async validatePatientExists(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        role: 'patient',
      },
    });

    if (!user) {
      throw new NotFoundException('Patient not found');
    }
  }

  async validateDoctorExists(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        role: 'doctor',
      },
    });

    if (!user) {
      throw new NotFoundException('Doctor not found');
    }
  }

  async validateDepartmentExists(departmentId: number) {
    const department = await this.prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new NotFoundException('Department not found');
    }
  }

  async validateAppointmentExists(appointmentId: number): Promise<Appointment> {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        patient: true,
        doctor: true,
        department: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async validateEmailExist(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException('Email already exist');
    }
  }

  async createPatient(
    firstName: string,
    lastName: string,
    email: string,
  ): Promise<User> {
    await this.validateEmailExist(email);
    const patient = await this.prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        role: 'patient',
      },
    });

    return patient;
  }

  async create(createDto: CreateAppointmentDto): Promise<AppointmentResponse> {
    try {
      let patientId;
      if (createDto.patient_id) {
        patientId = createDto.patient_id;
        await Promise.all([
          await this.validatePatientExists(createDto.patient_id),
          await this.validateDoctorExists(createDto.doctor_id),
          await this.validateDepartmentExists(createDto.department_id),
        ]);
      } else {
        if (!createDto.first_name || !createDto.last_name || !createDto.email) {
          throw new BadRequestException(
            'First name, last name, and email are required',
          );
        }
        const patient = await this.createPatient(
          createDto.first_name,
          createDto.last_name,
          createDto.email,
        );

        patientId = patient.id;

        await await Promise.all([
          await this.validateDoctorExists(createDto.doctor_id),
          await this.validateDepartmentExists(createDto.department_id),
        ]);
      }

      const appointment = await this.prisma.appointment.create({
        data: {
          patient_id: patientId,
          doctor_id: createDto.doctor_id,
          department_id: createDto.department_id,
          date: new Date(createDto.date),
          time: createDto.time,
          status: createDto.status,
          notes: createDto.notes,
        },
        include: {
          patient: true,
          doctor: true,
          department: true,
        },
      });

      console.log(createDto);

      let commission;

      if (createDto.status === 'confirmed') {
        if (!createDto.price || !createDto.commission) {
          throw new BadRequestException('price and commission is required');
        }
        if (createDto.commission.includes('%')) {
          const presentaseCommission = createDto.commission.replace('%', '');
          commission =
            (parseFloat(presentaseCommission) * createDto.price) / 100;
        } else {
          commission = parseFloat(createDto.commission);
        }
        if (!createDto.payment_item_id) {
          throw new BadRequestException('payment item id is required');
        }
        await this.prisma.payment.create({
          data: {
            doctor_id: createDto.doctor_id,
            patient_id: createDto.patient_id,
            sub_total: createDto.price,
            taxes: 0,
            total: createDto.price,
            amount_received: createDto.price,
            amount_to_pay: 0,
            doctor_commission: commission,
            paymentPaymentItem: {
              create: {
                payment_item_quantity: 1,
                payment_item_id: createDto.payment_item_id,
              },
            },
          },
        });

        const finances = await this.prisma.finance.findMany();

        if (finances.length === 0) {
          await this.prisma.finance.create({
            data: {
              total_monet: createDto.price,
            },
          });
        } else {
          await this.prisma.finance.update({
            where: {
              id: 1,
            },
            data: {
              total_monet: createDto.price,
            },
          });
        }
      }

      return toAppointmentResponse(appointment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: number,
    updateDto: UpdaeteAppointmentDto,
  ): Promise<AppointmentResponse> {
    try {
      const appointment = await this.validateAppointmentExists(id);
      if (updateDto.patient_id) {
        await this.validatePatientExists(updateDto.patient_id);
      }

      if (updateDto.doctor_id) {
        await this.validateDoctorExists(updateDto.doctor_id);
      }

      if (updateDto.department_id) {
        await this.validateDepartmentExists(updateDto.department_id);
      }

      const updatedAppointment = await this.prisma.appointment.update({
        where: {
          id,
        },
        data: {
          doctor_id: updateDto.doctor_id,
          department_id: updateDto.department_id,
          date: updateDto.date ? new Date(updateDto.date) : appointment.date,
          time: updateDto.time,
          status: updateDto.status,
          notes: updateDto.notes,
        },
        include: {
          patient: true,
          doctor: true,
          department: true,
        },
      });

      return toAppointmentResponse(updatedAppointment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.validateAppointmentExists(id);
      await this.prisma.appointment.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(date?: Date): Promise<AppointmentResponse[]> {
    try {
      const appointments = await this.prisma.appointment.findMany({
        where: {
          date:
            date && !isNaN(new Date(date).getTime())
              ? new Date(date)
              : undefined,
        },
        include: {
          patient: true,
          doctor: true,
          department: true,
        },
      });
      for (const appointment of appointments) {
        const date = appointment.date.toISOString().split('T')[0]; // Mengambil tanggal dari objek Date
        const dateTimeString = `${date}T${appointment.time}:00`; // Menggunakan 'T' sebagai pemisah
        const dateTime = new Date(dateTimeString); // Membuat objek Date dari string yang benar
        console.log(dateTime); // Cek apakah ini valid
        console.log(new Date().toISOString()); // Cek waktu saat ini dalam format ISO
        console.log(dateTime < new Date());
        console.log(appointment.time);
        console.log(appointment.date);
        if (dateTime < new Date() && appointment.status === 'confirmed') {
          await this.prisma.appointment.update({
            where: {
              id: appointment.id,
            },
            data: {
              status: 'Treated',
            },
          });
        } else if (dateTime < new Date() && appointment.status === 'pending') {
          await this.prisma.appointment.update({
            where: {
              id: appointment.id,
            },
            data: {
              status: 'cancelled',
            },
          });
        }
      }

      return appointments.map((appointment) =>
        toAppointmentResponse(appointment),
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number): Promise<AppointmentResponse> {
    try {
      const appointment = await this.validateAppointmentExists(id);

      return toAppointmentResponse(appointment);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
