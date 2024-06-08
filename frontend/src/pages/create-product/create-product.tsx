import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { CATEGORIA } from "../../enums/categoria";
import { TextField } from "../../components/text-field";
import { NumberField } from "../../components/number-field";
import { SelectionBox } from "../../components/selection-box";


interface Usuario {
    login: string;
    email: string;
    departamento: string;
    permissao: Number;
    senha: string;
    status: 1;
    admin: boolean;
}

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

    return (
        <>
            <div className="flex items-start justify-center mt-4 font-mediu">
                <div>

                    <form className="space-y-4">

                        <TextField nome="Nome:" setValor={setNome} valor={nome} />
                        <TextField nome="Descrição:" setValor={setDescricao} valor={descricao} />
                        <NumberField nome="Valor de Compra:" setValor={setValorCompra} valor={valor_compra} />
                        <NumberField nome="Valor de Venda:" setValor={setValorVenda} valor={valor_venda} />
                        <NumberField nome="Valor de Venda:" setValor={setValorVenda} valor={valor_venda} />

                        <label className="form-control w-full max-w-xs">
                            <input multiple onChange={handleFileChange} type="file" className="file-input file-input-sm file-input-bordered w-full max-w-xs" />
                            <div className="label">
                                <span className="label-text-alt">Apenas png, jpg e svg</span>
                            </div>
                        </label>

                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>

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
        </>
    )
}