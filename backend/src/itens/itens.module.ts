import { Module } from '@nestjs/common';
import { ItensService } from './itens.service';
import { ItensController } from './itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItensEntity } from './entities/itens.entity';
import { ImagensEntity } from './entities/imagens.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ItensEntity,ImagensEntity])],
  controllers: [ItensController],
  providers: [ItensService],
})
export class ItensModule {}
