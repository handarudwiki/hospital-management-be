import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: SignUpDto) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        birth_date: data.birth_date,
      },
    });
  }
}
