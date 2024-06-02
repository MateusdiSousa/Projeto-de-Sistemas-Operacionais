import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItensEntity } from "./itens.entity";

@Entity("Imagens")
export class ImagensEntity{

    @PrimaryGeneratedColumn("rowid")
    id : number

    @Column()
    nomeImagem : string

    @Column()
    tipoImagem : string

    @Column()
    tamanho : number

    @Column()
    url : string

    @ManyToOne(() => ItensEntity, (item) => item.image)
    itemId : ItensEntity
}