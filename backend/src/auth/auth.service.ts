import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { access } from 'fs';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService : JwtService
    ) { }

    async signIn(login: string, password: string) {
        const user: UserEntity = await this.userService.findOneByLogin(login)

        if (!user) {
            throw new UnauthorizedException("Usuário não encontrado")
        }

        const result : boolean = await user.comparePassword(password)

        switch (result) {
            case false:
                throw new UnauthorizedException("Senha Inválida")
            case true:
                const payload = { id: user.id , nome : user.nome, role : user.level }
                return {
                    access_token : await this.jwtService.signAsync(
                        payload,
                        {secret : process.env.TOKEN_JWT}
                    ),
                }
            default:
                throw new Error("Erro ao realizar validação")
        }
    }
}
