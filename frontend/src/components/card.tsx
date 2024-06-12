import { useNavigate } from "react-router-dom"
import { IProduto } from "../interfaces/produto"

export function Card(props: IProduto) {
    const nav = useNavigate()

    const numeroFormatado: string = props.valor_venda.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    console.log(numeroFormatado)
    return (
        <div className="card card-compact m-5 items-center w-96 bg-white shadow-xl">
            <figure><img src={props.url} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.nome}</h2>
                <p>{props.descricao}</p>
                <p>Estoque: {props.quant_estoque}</p>
                <p><b>{props.categoria.toUpperCase()}</b></p>
            </div>
            <button className="btn w-full btn-primary">{numeroFormatado}</button>
        </div>
    )
}