import { HttpCode, Injectable } from '@nestjs/common';
import { CreateItenDto } from './dto/create-iten.dto';
import { Repository } from 'typeorm';
import { ItensEntity } from './entities/itens.entity';
import { ImagensEntity } from './entities/imagens.entity';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItensService {

  constructor(
    @InjectRepository(ItensEntity)
    private readonly itemRepository: Repository<ItensEntity>,
    @InjectRepository(ImagensEntity)
    private readonly imageRepository: Repository<ImagensEntity>
  ) { }

  create(createItenDto: CreateItenDto) {
    return this.itemRepository.create(createItenDto)
  }

  async findAll(): Promise<ItensEntity[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<ItensEntity> {
    return await this.itemRepository.findOneBy({ id: id });
  }

  async update(id: number, updateItenDto: CreateItenDto) {
    try {
      const item: ItensEntity = await this.findOne(id)
      item.nome = updateItenDto.nome
      item.descricao = updateItenDto.descricao
      item.valor_compra = updateItenDto.valor_compra
      item.valor_venda = updateItenDto.valor_venda
      item.quant_estoque = updateItenDto.quant_estoque
      item.min_quant_estoque = updateItenDto.min_quant_estoque
      item.categoria = updateItenDto.categoria
      item.local_estoque = updateItenDto.local_estoque
      item.info_geral = updateItenDto.info_geral
      return await this.itemRepository.update(id, item);
    } catch (error) {
      return HttpCode(404)
    }
  }

  async remove(id: number) {
    return await this.itemRepository.delete({ id: id });
  }

  async addImagem(req: Request, id: number, file: Express.Multer.File) {
    try {
      const item : ItensEntity = await this.findOne(id)

      if (item) {
        const imagem: ImagensEntity = new ImagensEntity()
        imagem.nomeImagem = file.filename
        imagem.tamanho = file.size
        imagem.tipoImagem = file.mimetype
        imagem.itemId = item
        imagem.url = `${req.protocol}://${req.get("host")}/itens/imagem/${item.id}/${imagem.nomeImagem}`

        return await this.imageRepository.save(imagem)
      }
    } catch (error) {
      return error;
    }
  }

  async getImagens( id : number){
    try {
      const item : ItensEntity = await this.findOne(id)
      return await this.imageRepository.findBy({itemId : item})
    } catch (error) {
      return error
    }
  }
}
