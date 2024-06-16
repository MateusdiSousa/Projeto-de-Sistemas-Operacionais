import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ItensModule } from './itens/itens.module';
import { AuthModule } from './auth/auth.module';
import { FillDatabaseModule } from './fill-database/fill-database.module';
import { DataGuard } from './data.guard';
import { FillDatabaseService } from './fill-database/fill-database.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      database: process.env.DATABASE,
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ItensModule,
    AuthModule,
    FillDatabaseModule,
  ],
  controllers: [],
  providers: [DataGuard, FillDatabaseService],
  exports: []
})
export class AppModule implements OnModuleInit {
  constructor( private readonly dataGuard : DataGuard){}

   async onModuleInit() {
       await this.dataGuard.canActivate(null)
   }
}
