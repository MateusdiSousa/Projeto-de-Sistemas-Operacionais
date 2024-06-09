interface TextFieldProps {
    nome: string
    valor : string
    setValor : Function
}

export function TextField(props : TextFieldProps){
    return(
    <div className="flex space-x-3">
        <label>{props.nome}</label>
        <input className="bordaInput items-center w-72 h-auto p-1 rounded-md border-2"
            type="text" value={props.valor} onChange={(e) => props.setValor(e.target.value)} />
    </div>
    )
}