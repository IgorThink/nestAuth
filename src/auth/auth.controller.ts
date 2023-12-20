import { Body, Controller, Patch, Put, Request, Res, UseGuards } from '@nestjs/common';
import { IAuthUser } from 'src/dto/IAuthUser';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Patch('/login')
  async logIn(@Body() data) {
    console.log('asdasd', data);
    const res = await this.authService.logIn(data);
    delete res.password;
    return res;
  }

  @Put('/register')
  singUp(@Body() data: IAuthUser) {
    return this.authService.addUser(data);
  }
}
