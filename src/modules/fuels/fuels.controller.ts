import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';

import { QueryFuelPriceDto, ResponseFuelPriceDto } from './dtos';
import { TransformInterceptor } from '@common/interceptors';
import { FuelsService } from './fuels.service';

@Controller({
  path: 'fuels',
  version: '1',
})
export class FuelsController {
  constructor(private readonly fuelsService: FuelsService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(ResponseFuelPriceDto))
  getFuelPrices(@Query() query?: QueryFuelPriceDto) {
    return this.fuelsService.getFuelPrices(query);
  }
}
