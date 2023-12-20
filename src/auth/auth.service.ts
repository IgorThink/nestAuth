import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from 'src/dto/IAuthUser';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository() userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async logIn(data: IAuthUser) {
    console.log(this.jwtService)
    const user =
      (await this.userService.findBy({
        email: data.email,
        password: data.password,
      })) ||
      (await this.userService.findBy({
        username: data.username,
        password: data.password,
      }));
    console.log(user);
    if (user) {
      const payload = { sub: user.id, username: user.username };
      console.log(payload);
      console.log(await this.jwtService.signAsync(payload));
      const token = {
        access_token: await this.jwtService.signAsync(payload),
      };
      console.log('asdsa');
      return { ...user, token };
    } else {
      return 'Wrong Data';
    }
  }

  async addUser(user: any): Promise<any> {
    const result =
      (await this.userService.findBy({ username: user.username })) ||
      (await this.userService.findBy({ email: user.email }));
    if (!result) {
      try {
        const newUser = this.userService.create(user);
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
