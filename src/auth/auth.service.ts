import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/dto/IUser';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate({ email, username, password }) {
    const user = username
      ? await this.userService.findBy({ username })
      : await this.userService.findBy({ email });
    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async logIn(data: IUser) {
    const user = await this.validate(data);
    if (user) {
      const payload = { sub: data.id, username: data.username };
      const token = {
        access_token: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
        }),
      };
      return { ...data, token };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async addUser(user: any): Promise<any> {
    const result = this.validate(user);
    if (result && user.password && user.email && user.username) {
      try {
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

  async refreshToken(user: IUser) {
    const payload = {
      username: user.email,
      sub: {
        username: user.username,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
