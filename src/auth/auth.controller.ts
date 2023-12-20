import { Body, Controller, Patch, Put, Res } from '@nestjs/common';
import { IAuthUser } from 'src/dto/IAuthUser';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Patch('/login')
  logIn(@Body() data: IAuthUser) {
    console.log(data);
    return this.authService.logIn(data);
  }
  @Put('/register')
  singUp(@Body() data: IAuthUser) {
    return this.authService.addUser(data);
  }
}
