import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './DTO/sign.dto';

@Controller('auth')
export class AuthController {
    constructor( private readonly authService : AuthService){}

    @Post('login')
    async signIn(@Body() signDto : SignDto){
        return await this.authService.signIn(signDto.login, signDto.password)
    }
}
