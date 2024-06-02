import { Test, TestingModule } from '@nestjs/testing';
import { ItensController } from './itens.controller';
import { ItensService } from './itens.service';

describe('ItensController', () => {
  let controller: ItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItensController],
      providers: [ItensService],
    }).compile();

    controller = module.get<ItensController>(ItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
