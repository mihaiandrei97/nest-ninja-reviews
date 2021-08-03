import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  async register(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (user) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await this.prismaService.user.create({
      data: { email, password: hash },
    });
    return createdUser;
  }

  validateUser(userId: number) {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  }
}
