import { jwtDecode } from "jwt-decode"
import api from "../services/api"
import { ILogin } from "../interfaces/login"

const token = "vegstore"

export const authService = {
    async autenticarUser ( data : ILogin) {
        return await api.post("auth/login", data)
    },

    setToken (data: any){
        localStorage.setItem(token, data)
    },

    getToken(){
        return localStorage.getItem(token)
    },

    removeToken(){
        localStorage.removeItem(token)
    },

    decodificarToken (token : string | null | undefined){
        if (token) {
            const decode = jwtDecode(token)
            return decode
        }
        return null
    },

    getRole(){
        const role = this.decodificarToken(this.getToken());
        if (role) {
            return role?.role;
        }
        return null;
    }
}