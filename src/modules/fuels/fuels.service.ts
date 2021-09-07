import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PricesRepository } from './repositories';
import { QueryFuelPriceDto } from './dtos';

@Injectable()
export class FuelsService {
  private readonly logger = new Logger(FuelsService.name);

  constructor(
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

    const updatedAt = (data[0] && data[0].publicationDate) || new Date();

    return {
      valid: true,
      data,
      meta: {
        source: 'https://micm.gob.do',
        updatedAt,
        week: this.getDateWeekNumber(date),
        year: this.getDateYear(date),
      },
    };
  }

  private getLastSaturday(date: Date = new Date()): Date {
    const SATURDAY_WEEK_DAY = 6;

    if (SATURDAY_WEEK_DAY === date.getDay()) {
      return date;
    }

    const time = date.getDate() + (7 - date.getDay() - 1) - 7;
    date.setDate(time);

    return date;
  }

  private getDateWeekNumber(date: Date = new Date()) {
    const today = date;
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;

    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  private getDateYear(date: Date = new Date()) {
    return date.getFullYear();
  }

  private getLastUpdatedDate(date: Date = new Date()) {
    return new Date(date).toISOString();
  }
}
