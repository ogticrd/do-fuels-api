import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FuelsRepository, PricesRepository } from './repositories';
import { FuelsController } from './fuels.controller';
import { FuelsService } from './fuels.service';

@Module({
  imports: [TypeOrmModule.forFeature([FuelsRepository, PricesRepository])],
  providers: [FuelsService],
  controllers: [FuelsController],
})
export class FuelsModule {}
