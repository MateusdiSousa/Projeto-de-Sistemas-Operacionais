import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_JWT,
      signOptions: { expiresIn:"30d"}
    })
  ]
})
export class AuthModule {}
