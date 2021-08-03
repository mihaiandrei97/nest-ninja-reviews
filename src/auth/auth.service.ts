import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findUserByEmail(email);

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

  async register({ email, password }: LoginDto) {
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await this.usersService.createUser({
      email,
      password: hash,
    });

    return {
      accessToken: this.jwtService.sign({
        userId: createdUser.id,
      }),
    };
  }
}
