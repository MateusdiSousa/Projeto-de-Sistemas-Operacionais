import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImagensEntity } from "./imagens.entity";

@Entity({name: "itens_venda"})
export class ItensEntity {
    @PrimaryGeneratedColumn('rowid')
    id : number
    
    @Column()
    nome : string

    @Column()
    descricao : string

    @Column()
    valor_compra : number

    @Column()
    valor_venda : number

    @Column({type : 'int'})
    quant_estoque : number

    @Column({type: 'int'})
    min_quant_estoque

    @Column()
    categoria : CATEGORIA

    @Column()
    local_estoque : string

    @Column()
    info_geral : string

    @OneToMany(() => ImagensEntity, (image) => image.url, {cascade : true})
    image : ImagensEntity[]
}

export enum CATEGORIA {
    PORCAO='porcao',
    BEBIDA='bebida',
    COMBO='combo',
    DIVERSOS='diversos'
}
