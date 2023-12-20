import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UsersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.UsersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.UsersRepository.findOneBy({ id });
  }

  async findBy(
    data: Partial<{ username: string; password: string; email: string }>,
  ) {
    return await this.UsersRepository.findOneBy(data);
  }

  async create(
    data: Partial<{ username: string; password: string; email: string }>,
  ) {
    return await this.UsersRepository.create(data);
  }
  async save(data: any) {
    const result = await this.UsersRepository.save(data);
    return result;
  }

  async deleteUser(id: number): Promise<string> {
    await this.UsersRepository.delete(id);
    return 'User successfully deleted';
  }
}
