interface NumberFieldProps {
    nome: string
    valor : number
    setValor : Function
}

export function NumberField(props : NumberFieldProps){
    const convertStringToNumber = (text : string) => {
        const newValue : number = parseFloat(text);
        props.setValor(newValue)
    }

    return(
    <div className="flex space-x-3">
        <label>{props.nome}</label>
        <input className="items-center w-72 h-auto p-1 rounded-md border-2"
            type="number" value={props.valor} onChange={(e) => convertStringToNumber(e.target.value)} />
    </div>
    )
}