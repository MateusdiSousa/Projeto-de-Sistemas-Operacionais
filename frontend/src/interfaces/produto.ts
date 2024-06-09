import { CATEGORIA } from "../enums/categoria"

export interface IProduto{
    id ?: number
    nome : string
    descricao : string
    valor_compra : number
    valor_venda : number
    quant_estoque : number
    min_quant_estoque : number
    categoria : CATEGORIA
    local_estoque : string
    info_geral : string
}