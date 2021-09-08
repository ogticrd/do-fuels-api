import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PricesRepository } from './repositories';
import { QueryFuelPriceDto } from './dtos';
import { DateUtil } from '@utils/date.util';

@Injectable()
export class FuelsService {
  private readonly logger = new Logger(FuelsService.name);

  constructor(
    private readonly pricesRepository: PricesRepository,
    private readonly configService: ConfigService,
  ) {}

  async getFuelPrices(query: QueryFuelPriceDto) {
    const date = DateUtil.getLastSaturday(query.date);

    this.pricesRepository.init().findByDate(date);

    if (query.code) {
      this.pricesRepository.findByCode(query.code);
    }

    const limit = +this.configService.get('DEFAULT_PAGINATION_RESPONSE') || 23;

    const data = await this.pricesRepository.search(limit);

    return {
      valid: true,
      data,
      meta: {
        source: 'https://micm.gob.do',
        updatedAt: data[0] ? data[0].updatedAt : null,
        week: DateUtil.getIsoWeek(query.date),
        year: DateUtil.getYear(query.date),
      },
    };
  }
}
