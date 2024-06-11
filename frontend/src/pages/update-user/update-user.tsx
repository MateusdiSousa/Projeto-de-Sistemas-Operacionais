import React, { useEffect, useState } from "react";
import { TextField } from "../../components/text-field";
import { IUser } from "../../interfaces/usuario";
import { LEVEL } from "../../enums/level";
import { PasswordField } from "../../components/password-field";
import { SelectionBox } from "../../components/selection-box";
import { api } from "../../variaveis/api";
import { ConfirmationModal } from "../../components/modal-confirmation";
import { useParams } from "react-router-dom";

export function UpdateUser() {
    const [login, setLogin] = useState<string>("")
    const [nome, setNome] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [level, setLevel] = useState<LEVEL>()
    const [modal, setModal] = useState<boolean>(false)
    const { idUser } = useParams()

    useEffect(() => {
        api.get(`/user/${idUser}`).then(resp => {
            const user = resp.data
            setLogin(user.login)
            setLevel(user.level)
            setNome(user.nome)
            setSenha(user.password)
        })
    }, [])

    const atualizarUsuario = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (level) {
            const usuario: IUser = {
                login: login,
                level: level,
                nome: nome,
                password: senha
            }
            api.put(`user/${idUser}`, usuario)
            setModal(true)
            setTimeout(() => setModal(false), 4000)
        }
    }

    return (
        <>
            {modal && (
                <ConfirmationModal mensagem="Usuário atualizado com sucesso!" />
            )}
            <h1>Atualização de usuário</h1>
            <div className="flex items-start justify-center mt-4 font-medium space-x-5">
                <div>

                    <form className="space-y-4 justify-items-start">
                        <TextField nome="Nome:" setValor={setNome} valor={nome} />
                        <TextField nome="Login:" setValor={setLogin} valor={login} />
                        <PasswordField nome="Senha:" setValor={setSenha} valor={senha} />
                        <SelectionBox nome="Nível" lista={Object.values(LEVEL)} valor={level} setValor={setLevel} />
                        <button className="btn" onClick={(e) => atualizarUsuario(e)}>Salvar</button>
                    </form>

                </div>
            </div>
        </>
    )
}