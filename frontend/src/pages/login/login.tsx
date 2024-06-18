import { useState } from "react"
import { TextField } from "../../components/text-field"
import { PasswordField } from "../../components/password-field"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { ILogin } from "../../interfaces/login"
import { ModalError } from "../../components/modal-error"

export function Login() {
    const [login, setLogin] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [modal, setModal] = useState<boolean>(false)
    const nav = useNavigate()
    const auth = useAuth()

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const data: ILogin = {
            login: login,
            password: senha
        }
        try {
            await auth?.login(data)
            nav("/")
        } catch (error) {
            setModal(true)
            setTimeout(() => setModal(false), 3000)
        }
    }

    return (
        <>
            <div className="flex flex-col space-y-5 items-center min-h-screen">
                <h1>Login</h1>
                {modal && (
                    <ModalError mensagem="Login ou senha inválidos" />
                )}
                <TextField valor={login} setValor={setLogin} nome="Usuário:" />
                <PasswordField valor={senha} setValor={setSenha} nome="Senha:" />
                <button onClick={(e) => handleLogin(e)} className="btn">Login</button>
            </div>
        </>
    )
}