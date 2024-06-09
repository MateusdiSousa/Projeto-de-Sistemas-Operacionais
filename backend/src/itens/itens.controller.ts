import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Req, StreamableFile, ImATeapotException, ParseFilePipe, ParseFilePipeBuilder, HttpStatus, Put } from '@nestjs/common';
import { ItensService } from './itens.service';
import { CreateItenDto } from './dto/create-iten.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer.config';
import { Request } from 'express';
import * as fs from 'fs'
import { join } from 'path';


@Controller('produto')
export class ItensController {
  constructor(private readonly itensService: ItensService) { }

  @Post()
  async create(@Body() createItenDto: CreateItenDto) {
    return await this.itensService.create(createItenDto);
  }

  @Get()
  findAll() {
    return this.itensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itensService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateItenDto: CreateItenDto) {
    return this.itensService.update(id, updateItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itensService.remove(+id);
  }

  @Post("imagem/:id")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  addImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|png|svg/,
        }).build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        }),
    ) file: Express.Multer.File,
    @Param('id') id: number,
    @Req() req: Request
  ) {
    return this.itensService.addImagem(req, id, file)
  }

  @Get("imagem/:id/:image")
  getImage(
    @Param("id") id: string,
    @Param("image") imageName: string
  ) {
    const image = fs.createReadStream(join(process.cwd(), `/imagens/${id}/${imageName}`))
    return new StreamableFile(image)
  }
}
