import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FuelsController } from './fuels.controller';
import { FuelsService } from './fuels.service';
import { cacheOptions } from '@core/cache';
import { Fuel, Price } from './entities';
import { DbModule } from '@core/db';

@Module({
  imports: [DbModule, CacheModule.register(cacheOptions), TypeOrmModule.forFeature([Price, Fuel])],
  controllers: [FuelsController],
  providers: [FuelsService],
})
export class FuelsModule {}
