import { HttpCode, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository : Repository<UserEntity>
  ){}

  async create(user: CreateUserDto) {
    const newUser : UserEntity = new UserEntity()
    newUser.level = user.level
    newUser.login = user.login
    newUser.nome = user.nome
    await newUser.setPassword(user.password)
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) : Promise<UserEntity>{
    return await this.userRepository.findOneBy({id : id});
  }

  async findOneByLogin(login : string) : Promise<UserEntity | undefined>{
    return await this.userRepository.findOneBy({login : login})
  }

  async update(id: number, user: CreateUserDto) {
    const actualUser : UserEntity = await this.findOne(id);
    actualUser.level = user.level
    actualUser.login = user.login
    actualUser.nome = user.nome
    actualUser.setPassword(user.password)
    return await this.userRepository.save(actualUser)
  }

  async remove(id: number) {
    const user : UserEntity = await this.findOne(id)
    if (user) {
      return this.userRepository.remove(user);
    }
    return HttpCode(404)
  }


}
