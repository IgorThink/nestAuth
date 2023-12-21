import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Characters } from './entities/characters.entity';

@Injectable()
export class CharatersService {
  constructor(
  ) {}
}
