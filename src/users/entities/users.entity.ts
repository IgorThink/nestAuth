import { Characters } from 'src/charaters/entities/characters.entity';
import { ICharacters } from 'src/dto/ICharacters';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'json', default: [], array: true, nullable: true })
  favoriteCharacters: ICharacters[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
