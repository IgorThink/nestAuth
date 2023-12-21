import { Body, Controller, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { IAuthUser } from 'src/dto/IAuthUser';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Patch('/login')
  async logIn(@Body() data) {
    const res = await this.authService.logIn(data);
    // delete res.password;
    return res;
  }

  @Put('/register')
  singUp(@Body() data: IAuthUser) {
    return this.authService.addUser(data);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Body() data) {
    return this.authService.refreshToken(data);
  }
}
