import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { ICharacters } from 'src/dto/ICharacters';

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
    data: Partial<{ username?: string; password?: string; email?: string }>,
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

  async getUserCharacters({ username }): Promise<ICharacters[]> {
    const user = await this.UsersRepository.findOneBy({ username });
    return user.favoriteCharacters;
  }

  async addUserCharacter({ username, characters }) {
    const user = await this.UsersRepository.findOneBy({
      username,
    });
    user.favoriteCharacters.push(characters);
    return await this.UsersRepository.save(user);
  }

  async deleteUserCharacter({ username, characters }) {
    const user = await this.UsersRepository.findOneBy({
      username,
    });
    user.favoriteCharacters = user.favoriteCharacters.filter(
      (character) => character.id !== characters.id,
    );
    return await this.UsersRepository.save(user);
  }

  async deleteUser(id: number): Promise<string> {
    await this.UsersRepository.delete(id);
    return 'User successfully deleted';
  }
}
