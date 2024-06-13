import { useState } from "react"
import { TextField } from "../../components/text-field"
import { PasswordField } from "../../components/password-field"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { ILogin } from "../../interfaces/login"

export function Login() {
    const [login, setLogin] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const nav = useNavigate()
    const auth = useAuth()

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const data: ILogin = {
            login: login,
            password: senha
        }

        await auth?.login(data)
        nav("/")
    }

    return (
        <>
            <div className="flex flex-col space-y-5 items-center min-h-screen">
                <h1>Login</h1>
                <TextField valor={login} setValor={setLogin} nome="Usuário:" />
                <PasswordField valor={senha} setValor={setSenha} nome="Senha:" />
                <button onClick={(e) => handleLogin(e)} className="btn">Login</button>
            </div>
        </>
    )
}