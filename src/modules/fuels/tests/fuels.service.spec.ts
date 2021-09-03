import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { FuelsService } from '../fuels.service';
import { FuelsRepository, PricesRepository } from '../repositories';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('FuelsService', () => {
  let service: FuelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        FuelsService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(PricesRepository),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(FuelsRepository),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<FuelsService>(FuelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
