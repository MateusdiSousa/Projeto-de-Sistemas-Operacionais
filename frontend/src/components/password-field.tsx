interface PasswordFieldProps {
    nome: string
    valor : string
    setValor : Function
}

export function PasswordField(props : PasswordFieldProps){
    return(
    <div className="flex space-x-3">
        <label>{props.nome}</label>
        <input className="bordaInput items-center w-72 h-auto p-1 rounded-md border-2"
            type="password" onChange={(e) => props.setValor(e.target.value)} />
    </div>
    )
}