interface SelectionBoxProps {
    nome: string
    lista: Array<any>
    valor: any
    setValor: Function
}

export function SelectionBox(props: SelectionBoxProps) {
    return (
        <div className="flex space-x-3">
            <select id='categoria-selected' value={props.valor} onChange={(e) => props.setValor(e.target.value)} className="select select-bordered bg-white w-full max-w-xs">
                <option disabled selected>{props.nome}</option>
                {props.lista.map((item) => {
                    return (
                        <option value={item} key={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    )
}