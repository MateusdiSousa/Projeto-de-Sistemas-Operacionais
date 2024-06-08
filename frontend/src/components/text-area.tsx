interface TextFieldProps {
    nome: string
    valor : string
    setValor : Function
}

export function TextAreaField(props : TextFieldProps){
    return(
    <div className="space-x-3">
        <label>{props.nome}</label>
        <textarea className="bordaInput items-center w-72 h-auto p-1 rounded-md border-2"
         value={props.valor} onChange={(e) => props.setValor(e.target.value)} />
    </div>
    )
}