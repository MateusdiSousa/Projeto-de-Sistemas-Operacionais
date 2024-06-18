import { LEVEL } from "../enums/level"

export interface IUser {
    id ?: number
    login : string
    nome : string
    password : string
    level : LEVEL
}
