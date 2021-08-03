import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { userId: number }) {
    // const user = await this.auth.validateUser(payload.userId);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...result } = user;

    // return result;
    return { userId: payload.userId };
  }
}
