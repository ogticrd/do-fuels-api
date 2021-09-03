import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FuelsRepository, PricesRepository } from './repositories';
import { QueryFuelPriceDto } from './dtos';

@Injectable()
export class FuelsService {
  private readonly logger = new Logger(FuelsService.name);

  constructor(
    private readonly fuelsRepository: FuelsRepository,
    private readonly pricesRepository: PricesRepository,
    private readonly configService: ConfigService,
  ) {}

  async getFuelPrices(query: QueryFuelPriceDto) {
    const date = this.getLastSaturday(query.date);
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
        updatedAt: date,
        week: 51,
      },
    };
  }

  private getLastSaturday(date: Date): Date {
    const SATURDAY_WEEK_DAY = 6;
    date = date || new Date();

    if (SATURDAY_WEEK_DAY === date.getDay()) {
      return date;
    }

    const time = date.getDate() + (7 - date.getDay() - 1) - 7;
    date.setDate(time);

    return date;
  }
}
