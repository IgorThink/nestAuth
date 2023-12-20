import { Module } from '@nestjs/common';
import { CharatersService } from './charaters.service';
import { CharatersController } from './charaters.controller';

@Module({
  providers: [CharatersService],
  controllers: [CharatersController]
})
export class CharatersModule {}
