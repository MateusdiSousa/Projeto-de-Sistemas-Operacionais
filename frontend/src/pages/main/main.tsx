import { useEffect, useState } from "react";
import { Carousel } from "../../components/carousel";
import  api from "../../services/api";
import { IProduto } from "../../interfaces/produto";
import { Card } from "../../components/card";
import { FiltroProdutos } from "../../components/filtro-products";
import { SearchField } from "../../components/search-field";

export function Main() {
    const [produtos, setProdutos] = useState<IProduto[]>([])
    const [produtosFiltrados, setProdutosFiltrados] = useState<IProduto[]>([])

    useEffect(() => {
        api.get("produto").then(resp => {
            console.log(resp.data)
            setProdutos(resp.data)
            setProdutosFiltrados(resp.data)
        })
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filtrados: IProduto[] = []
        const textoCampo = e.target.value.toLowerCase()
        produtos.map(produto => {
            if (produto.nome.toLowerCase().includes(textoCampo)) {
                return filtrados.push(produto)
            }
        })
        setProdutosFiltrados(filtrados)
    }

    return (
        <div className="bg-base-100">
            <Carousel />
            <div className="flex items-start">
                <h1 className="text-3xl p-10 font-bold">Produtos</h1>
            </div>

            <FiltroProdutos itens={produtos} setItensFiltrados={setProdutosFiltrados} />
            <SearchField handleSearch={handleSearch}/>

            <div className="flex flex-wrap">
                {produtosFiltrados && (
                    produtosFiltrados.map(produto => {
                        if (produto.id && produto.quant_estoque > produto.min_quant_estoque) {
                            return (
                                <Card categoria={produto.categoria}
                                    nome={produto.nome}
                                    descricao={produto.descricao}
                                    url={produto.url}
                                    id={produto.id}
                                    info_geral={produto.info_geral}
                                    local_estoque={produto.local_estoque}
                                    min_quant_estoque={produto.min_quant_estoque}
                                    quant_estoque={produto.quant_estoque}
                                    valor_compra={produto.valor_compra}
                                    valor_venda={produto.valor_venda}
                                />
                            )
                        }
                    })
                )}
            </div>
        </div>
    )
}