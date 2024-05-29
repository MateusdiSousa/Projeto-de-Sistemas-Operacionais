import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LEVEL } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt'

@Entity({name : 'User'})
export class UserEntity {
    @PrimaryGeneratedColumn("increment")
    id : number

    @Column({unique : true})
    login : string

    @Column({type : 'text'})
    nome : string

    @Column()
    password : string

    @Column()
    level : LEVEL

    async setPassword(password : string) : Promise<void> {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(password, salt)
    }

    async comparePassword( password : string ) : Promise<boolean> {
        return await bcrypt.compare(password, this.password)
    }
}
