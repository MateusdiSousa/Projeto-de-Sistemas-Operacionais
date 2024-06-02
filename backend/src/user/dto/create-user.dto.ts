export class CreateUserDto {
    id ?: number
    login : string
    nome : string
    password : string
    level : LEVEL
}

export enum LEVEL {
    ADMIN='admin',
    USER='user'
}
