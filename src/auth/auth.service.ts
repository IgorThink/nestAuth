import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from 'src/dto/IAuthUser';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/dto/IUser';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository() userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate({ email, username, password }) {
    console.log(email, username, password);
    const user = username
      ? await this.userService.findBy({ username })
      : await this.userService.findBy({ email });
    if (user && password === user.password) {
      const { password, ...result } = user;
      console.log('data', result);
      return result;
    }
    return null;
  }

  async logIn(data: IUser) {
    console.log(data);
    const payload = { sub: data.id, username: data.username };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return { ...data, token };
  }

  async addUser(user: any): Promise<any> {
    const result = this.validate(user);
    if (result && user.password && user.email && user.username) {
      try {
        console.log('user', user);
        const newUser = await this.userService.create(user);
        this.userService.save(newUser);
        const payload = { sub: user.id, username: user.username };
        const token = await this.jwtService.signAsync(payload);
        return { ...newUser, token: token };
      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      return 'User with this data already exists';
    }
  }
}
