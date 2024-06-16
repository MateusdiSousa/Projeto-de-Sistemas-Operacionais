import { Test, TestingModule } from '@nestjs/testing';
import { FillDatabaseService } from './fill-database.service';

describe('FillDatabaseService', () => {
  let service: FillDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FillDatabaseService],
    }).compile();

    service = module.get<FillDatabaseService>(FillDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
