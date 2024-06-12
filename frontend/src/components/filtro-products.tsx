import { CATEGORIA } from "../enums/categoria"
import { IProduto } from "../interfaces/produto"

interface FiltroProdutosProps {
    itens : IProduto[]
    setItensFiltrados : Function
}

export function FiltroProdutos(props : FiltroProdutosProps) {

    const filtrarCategoria = (cat: CATEGORIA | null) => {
        if (cat == null) {
            props.setItensFiltrados(props.itens)
        }
        else {
            const listProduto: IProduto[] = []
            props.itens.map(produto => {
                if (produto.categoria == cat) {
                    listProduto.push(produto)
                }
            })
            if (listProduto) {
                props.setItensFiltrados(listProduto)
            }
        }
    }
    
    return (
        <>
            <div className="flex items-start pb-10">
                <ul className="menu menu-horizontal bg-base-200 rounded-box">
                    <li>
                        <a onClick={() => filtrarCategoria(CATEGORIA.BEBIDA)}>
                            Bebida
                        </a>
                    </li>
                    <li>
                        <a onClick={() => filtrarCategoria(CATEGORIA.COMBO)}>
                            Combo
                        </a>
                    </li>
                    <li>
                        <a onClick={() => filtrarCategoria(CATEGORIA.DIVERSOS)}>
                            Diversos
                        </a>
                    </li>
                    <li>
                        <a onClick={() => filtrarCategoria(CATEGORIA.PORCAO)}>
                            Porção
                        </a>
                    </li>
                    <li>
                        <a onClick={() => filtrarCategoria(null)}>
                            Todos
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}