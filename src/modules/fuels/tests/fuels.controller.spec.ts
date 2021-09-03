import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { FuelsController } from '../fuels.controller';
import { FuelsService } from '../fuels.service';
import { FuelsRepository, PricesRepository } from '../repositories';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('FuelsController', () => {
  let controller: FuelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [FuelsController],
      providers: [
        FuelsService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(FuelsRepository),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(PricesRepository),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    controller = module.get<FuelsController>(FuelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
