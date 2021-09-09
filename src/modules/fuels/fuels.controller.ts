import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';

import {
  BadRequestResponseDto,
  QueryFuelPriceDto,
  ResponseFuelPriceDto,
} from './dtos';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransformInterceptor } from '@common/interceptors';
import { FuelsService } from './fuels.service';

@Controller({
  path: 'fuels',
  version: '1',
})
@ApiTags('Fuel Prices')
export class FuelsController {
  constructor(private readonly fuelsService: FuelsService) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(ResponseFuelPriceDto))
  @ApiOkResponse({ type: ResponseFuelPriceDto })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  getFuelPrices(@Query() query?: QueryFuelPriceDto) {
    return this.fuelsService.getFuelPrices(query);
  }
}
