import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PricesRepository } from './repositories';
import { DateUtil } from '@utils/date.util';
import { QueryFuelPriceDto } from './dtos';

@Injectable()
export class FuelsService {
  private readonly logger = new Logger(FuelsService.name);

  constructor(
    private readonly pricesRepository: PricesRepository,
    private readonly configService: ConfigService,
  ) {}

  async getFuelPrices(query: QueryFuelPriceDto) {
    const date = DateUtil.getLastSaturday(query.date);

    let week: number = null,
      year: number = null,
      updatedAt: Date = null;

    this.pricesRepository.init();

    if (query.since || query.until) {
      if (!query.since) {
        throw new BadRequestException("The 'since' property is required");
      }

      if (!query.until) {
        throw new BadRequestException("The 'until' property is required");
      }

      this.pricesRepository.findByDateRanges(query.since, query.until);
    } else {
      this.pricesRepository.findByDate(date);

      updatedAt = new Date();
      week = DateUtil.getIsoWeek(query.date);
      year = DateUtil.getYear(query.date);
    }

    if (query.code) {
      this.pricesRepository.findByCode(query.code);
    }

    const limit = +this.configService.get('DEFAULT_PAGINATION_RESPONSE') || 23;
    const data = await this.pricesRepository.search(limit);

    if (data.length) {
      updatedAt = updatedAt ? data[0].updatedAt : null;
    }

    return {
      valid: true,
      data,
      meta: {
        source: 'https://micm.gob.do',
        updatedAt,
        week,
        year,
      },
    };
  }
}
