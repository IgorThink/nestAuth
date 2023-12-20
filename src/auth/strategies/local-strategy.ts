import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authSrvice: AuthService) {
    super();
  }

  async validate({ email, username, password }) {
    const user = await this.authSrvice.validate({ email, username, password });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      return user;
    }
  }
}
