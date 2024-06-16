import { Module } from '@nestjs/common';
import { FillDatabaseService } from './fill-database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [FillDatabaseService],
  exports: [TypeOrmModule]
})
export class FillDatabaseModule { }
