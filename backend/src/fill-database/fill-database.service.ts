import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LEVEL } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FillDatabaseService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usuarioRepository: Repository<UserEntity>) {
    }

    async isEmpty() : Promise<void> {
        const countUsuario = await this.usuarioRepository.count();
        if (countUsuario == 0) {
            const usuario = new UserEntity();
            usuario.level = LEVEL.ADMIN
            usuario.nome = "admin"
            usuario.login = "admin"
            await usuario.setPassword("admin")
            await this.usuarioRepository.save(usuario)
        }
    }
}
