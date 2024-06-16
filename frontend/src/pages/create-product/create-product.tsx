import { useState } from "react";
import { CATEGORIA } from "../../enums/categoria";
import { TextField } from "../../components/text-field";
import { NumberField } from "../../components/number-field";
import { SelectionBox } from "../../components/selection-box";
import { InputFile } from "../../components/input-files";
import { IProduto } from "../../interfaces/produto";
import api from "../../services/api";
import { ConfirmationModal } from "../../components/modal-confirmation";
import { ModalError } from "../../components/modal-error";

export function CreateProduct() {
    const [nome, setNome] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [valor_compra, setValorCompra] = useState<number>(0)
    const [valor_venda, setValorVenda] = useState<number>(0)
    const [quant_estoque, setQuantEstoque] = useState<number>(0)
    const [min_quant_estoque, setMinQuantEstoque] = useState<number>(0)
    const [categoria, setCategoria] = useState<CATEGORIA | null>()
    const [local_estoque, setLocalEstoque] = useState<string>("")
    const [info_geral, setInfoGeral] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [modalError, setModalError] = useState<boolean>(false)
    const listaCategorias = Object.values(CATEGORIA)
    const [mensagem, setMensagem] = useState<string>("")


    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
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

            await api.post("produto", dataSend).then(async resp => {
                const data: IProduto = resp.data
                setMensagem("Produto criado com sucesso!")
                setModal(true)
                setTimeout(() => setModal(false), 4000);
                setNome('')
                setDescricao('')
                setValorCompra(0)
                setValorVenda(0)
                setQuantEstoque(0)
                setMinQuantEstoque(0)
                setLocalEstoque('')
                setInfoGeral('')
                setCategoria(null)
                if (data.id) {
                    salvarImagens(data.id)
                }
            }).catch(() => {
                setMensagem("Erro ao criar o produto")
                setModalError(true);
                setInterval(() => setModalError(false), 4000)
            })

        }
    }

    const salvarImagens = async (id: number) => {
        files.forEach(file => {
            const form = new FormData()
            form.append("file", file)
            api.post(`/produto/imagem/${id}`, form).then(resp => {
                setMensagem("Imagem salva com sucesso!")
                setModal(true)
                setTimeout(() => setModal(false), 4000);
            }).catch(() => {
                setMensagem("Falha ao salvar imagem!")
                setModalError(true);
                setInterval(() => setModalError(false), 4000)
            })
        })
    }

    return (
        <>
            {modal && (
                <ConfirmationModal mensagem="Produto criado com sucesso!" />
            )}

            {modalError && (
                <ModalError mensagem="Erro ao criar o produto" />
            )}

            <h1>Cadastro de Produto</h1>
            <div className="flex items-start justify-center mt-4 font-medium space-x-5">
                <div>

                    <form className="space-y-4 justify-items-start">

                        <TextField nome="Nome:" setValor={setNome} valor={nome} />
                        <TextField nome="Descrição:" setValor={setDescricao} valor={descricao} />
                        <NumberField nome="Valor de Compra:" setValor={setValorCompra} valor={valor_compra} />
                        <NumberField nome="Valor de Venda:" setValor={setValorVenda} valor={valor_venda} />
                        <InputFile files={files} setFiles={handleFile} label="Apenas png, jpg e svg" />
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
            <div className="items-center">
                <button onClick={salvarProduto} className="btn w-32">Salvar</button>
            </div>
        </>
    )
}