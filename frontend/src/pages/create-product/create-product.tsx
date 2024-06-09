import { useState } from "react";
import { CATEGORIA } from "../../enums/categoria";
import { TextField } from "../../components/text-field";
import { NumberField } from "../../components/number-field";
import { SelectionBox } from "../../components/selection-box";
import { InputFile } from "../../components/input-files";
import { IProduto } from "../../interfaces/produto";
import { api } from "../../variaveis/api";
import { ConfirmationModal } from "../../components/modal-confirmation";

export function CreateProduct() {
    const [nome, setNome] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [valor_compra, setValorCompra] = useState<number>(0)
    const [valor_venda, setValorVenda] = useState<number>(0)
    const [quant_estoque, setQuantEstoque] = useState<number>(0)
    const [min_quant_estoque, setMinQuantEstoque] = useState<number>(0)
    const [categoria, setCategoria] = useState<CATEGORIA>()
    const [local_estoque, setLocalEstoque] = useState<string>("")
    const [info_geral, setInfoGeral] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const listaCategorias = Object.values(CATEGORIA)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileSelected: File[] = Array.from(event.target.files)
            const filteredFiles: File[] = []

            fileSelected.forEach(f => {
                const typeFile = f.type.split("/")[1]
                if (typeFile == "jpeg" || typeFile == "png" || typeFile == "svg") {
                    filteredFiles.push(f)
                }
                else {
                    alert(`${f.name} não é uma imagem`)
                }
            })
            setFiles(filteredFiles)
        }
    };

    const salvarProduto = async () => {
        if (categoria) {
            const dataSend: IProduto = {
                categoria: categoria,
                descricao: descricao,
                info_geral: info_geral,
                local_estoque: info_geral,
                min_quant_estoque: min_quant_estoque,
                nome: nome,
                quant_estoque: quant_estoque,
                valor_compra: valor_compra,
                valor_venda: valor_venda
            }

            console.log(dataSend)

            try {
                await api.post("produto", dataSend).then(async resp => {
                    const data: IProduto = resp.data
                    if (data.id) {
                        salvarImagens(data.id)
                    }
                    setModal(true)
                    setTimeout(() => setModal(false), 4000);
                })

            } catch (error) {
                console.log(error)
            }

        }
    }

    const salvarImagens = async (id: number) => {
        files.forEach(file => {
            const form = new FormData()
            form.append("file", file)
            try {
                api.post(`/produto/imagem/${id}`, form).then(resp => {
                })
            } catch (error) {
                console.log(error)
            }
        })
    }

    return (
        <>
            {modal && (
                <ConfirmationModal mensagem="Produto criado com sucesso!" />
            )}

            <h1>Cadastro de Produto</h1>
            <div className="flex items-start justify-center mt-4 font-medium space-x-5">
                <div>

                    <form className="space-y-4 justify-items-start">

                        <TextField nome="Nome:" setValor={setNome} valor={nome} />
                        <TextField nome="Descrição:" setValor={setDescricao} valor={descricao} />
                        <NumberField nome="Valor de Compra:" setValor={setValorCompra} valor={valor_compra} />
                        <NumberField nome="Valor de Venda:" setValor={setValorVenda} valor={valor_venda} />
                        <InputFile files={files} setFiles={handleFileChange} label="Apenas png, jpg e svg" />
                    </form>

                </div>

                <div>

                    <form className="space-y-4">
                        <NumberField nome="Quantidade em estoque:" setValor={setQuantEstoque} valor={quant_estoque} />
                        <NumberField nome="Quantidade mínima de estoque:" setValor={setMinQuantEstoque} valor={min_quant_estoque} />
                        <TextField nome="Local do estoque:" setValor={setLocalEstoque} valor={local_estoque} />
                        <TextField nome="Detalhes adicionais:" setValor={setInfoGeral} valor={info_geral} />
                        <SelectionBox lista={listaCategorias} nome="Categorias:" setValor={setCategoria} valor={categoria} />

                    </form>

                </div>


            </div>
            <button onClick={salvarProduto} className="btn flex">Salvar</button>
        </>
    )
}