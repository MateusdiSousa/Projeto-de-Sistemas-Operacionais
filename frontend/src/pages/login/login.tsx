import { useState } from "react"
import { TextField } from "../../components/text-field"
import { PasswordField } from "../../components/password-field"

export function Login() {
    const [nome, setNome] = useState<string>("")
    const [senha, setSenha] = useState<string>("")


    return (
        <>
            <div className="flex flex-col space-y-5 items-center">
                <h1>Login</h1>
                <TextField valor={nome} setValor={setNome} nome="Usuário:" />
                <PasswordField valor={senha} setValor={setSenha} nome="Senha:" />
                <button className="btn">Login</button>
            </div>
        </>
    )
}