import { Module } from '@nestjs/common';
import { CharatersService } from './charaters.service';
import { CharatersController } from './charaters.controller';
import { Characters } from './entities/characters.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  providers: [CharatersService],
  controllers: [CharatersController],
})
export class CharatersModule {}
