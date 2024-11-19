import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

import {
  QueryFuelPriceDto,
  ResponseFuelPriceDto,
} from './dtos';
import { TransformInterceptor } from '@core/interceptors';
import { FuelsService } from './fuels.service';
import { Serializer } from '@core/decorators';

@ApiTags('Fuel Prices')
@UseInterceptors(CacheInterceptor)
@Controller({
  path: 'fuels',
  version: '1',
})
export class FuelsController {
  constructor(private readonly fuelsService: FuelsService) {}

  @Get()
  @Serializer(ResponseFuelPriceDto)
  getFuelPrices(@Query() query?: QueryFuelPriceDto) {
    return this.fuelsService.getFuelPrices(query);
  }
}
