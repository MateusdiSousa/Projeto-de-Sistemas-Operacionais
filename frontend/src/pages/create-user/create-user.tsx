import React, { useState } from "react";
import { TextField } from "../../components/text-field";
import { IUser } from "../../interfaces/usuario";
import { LEVEL } from "../../enums/level";
import { PasswordField } from "../../components/password-field";
import { SelectionBox } from "../../components/selection-box";
import api from "../../services/api";
import { ConfirmationModal } from "../../components/modal-confirmation";
import { ModalError } from "../../components/modal-error";

export function CreateUser() {
    const [login, setLogin] = useState<string>("")
    const [nome, setNome] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [level, setLevel] = useState<LEVEL>()
    const [modal, setModal] = useState<boolean>(false)
    const [modalError, setModalError] = useState<boolean>(false)

    const criarUsuario = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (level) {
            const usuario: IUser = {
                login: login,
                level: level,
                nome: nome,
                password: senha
            }

            api.post("/user", usuario).then(() => {
                setModal(true)
                setTimeout(() => setModal(false), 4000)
            }).catch( () => {
                setModalError(true)
                setTimeout(() => setModalError(false), 4000)
            })

        }
    }

    return (
        <>
            {modal && (
                <ConfirmationModal mensagem="Usuário criado com sucesso!" />
            )}
            {modalError && (
                <ModalError mensagem="Usuário já existe!" />
            )}
            <h1>Criação de usuário</h1>
            <div className="flex items-start justify-center mt-4 font-medium space-x-5">
                <div>

                    <form className="space-y-4 justify-items-start">
                        <TextField nome="Nome:" setValor={setNome} valor={nome} />
                        <TextField nome="Login:" setValor={setLogin} valor={login} />
                        <PasswordField nome="Senha:" setValor={setSenha} valor={senha} />
                        <SelectionBox nome="Nível" lista={Object.values(LEVEL)} valor={level} setValor={setLevel} />
                        <button className="btn" onClick={(e) => criarUsuario(e)}>Salvar</button>
                    </form>


                </div>
            </div>
        </>
    )
}