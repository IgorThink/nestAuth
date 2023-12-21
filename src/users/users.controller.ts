import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { IUser } from 'src/dto/IUser';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtGuard)
  @Get('characters/:params')
  getUserCharacters(@Param('params') username) {
    this.usersService.getUserCharacters(username);
  }

  @UseGuards(JwtGuard)
  @Patch('characters/')
  addUserCharacters(@Body() data) {
    this.usersService.addUserCharacter(data);
  }

  @UseGuards(JwtGuard)
  @Delete('characters/')
  deleteUserCharacters(@Body() data) {
    this.usersService.deleteUserCharacter(data);
  }
}
