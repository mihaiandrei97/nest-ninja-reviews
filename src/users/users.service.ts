import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  findUserById(userId: number) {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email: email },
    });
  }

  createUser(data: { email: string; password: string }) {
    return this.prismaService.user.create({
      data,
    });
  }
}
