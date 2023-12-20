import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Characters {
  @Column({
    primary: true,
  })
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  gender: string;

  @Column()
  species: string;

  @Column()
  Type: string;

  @Column()
  location: string;

  // @ManyToMany(() => User, (user) => user.favoriteCharacters)
  // @JoinColumn({ name: 'users_id' })
  // users: User[];

  @Column('text', { array: true })
  episodes: string[];

  @CreateDateColumn()
  createdAt: Date;
}
