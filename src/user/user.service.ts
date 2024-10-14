import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findById(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async create(data: SignUpDto) {
    try {
      return this.prisma.user.create({
        data: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.password,
          birth_date: data.birth_date,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
