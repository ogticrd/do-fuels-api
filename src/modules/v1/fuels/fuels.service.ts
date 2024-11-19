import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { DateUtil } from '@common/utils/date.util';
import { QueryFuelPriceDto } from './dtos';
import { Price } from './entities';

@Injectable()
export class FuelsService {
  private readonly logger = new Logger(FuelsService.name);
  private queryBuilder: SelectQueryBuilder<Price>;

  constructor(
    @InjectRepository(Price) private readonly prices: Repository<Price>,
    private readonly configService: ConfigService,
  ) {}

  async getFuelPrices(query: QueryFuelPriceDto) {
    const date = DateUtil.getLastSaturday(query.date);

    let week: number = null,
      year: number = null,
      updatedAt: Date = null;

    this.init();

    if (query.since || query.until) {
      if (!query.since) {
        throw new BadRequestException("The 'since' property is required");
      }

      if (!query.until) {
        throw new BadRequestException("The 'until' property is required");
      }

      this.findByDateRanges(query.since, query.until);
    } else {
      this.findByDate(date);

      updatedAt = new Date();
      week = DateUtil.getIsoWeek(query.date);
      year = DateUtil.getYear(query.date);
    }

    if (query.code) {
      this.findByCode(query.code);
    }

    const limit = +this.configService.get('DEFAULT_PAGINATION_RESPONSE') || 23;
    const data = await this.search(limit);

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

   init() {
    this.queryBuilder = this.prices
      .createQueryBuilder('price')
      .innerJoinAndSelect('price.fuel', 'fuel');

    return this;
  }

  getQueryBuilder(): SelectQueryBuilder<Price> {
    return this.queryBuilder;
  }

  findByCode(code: string) {
    this.queryBuilder.andWhere('fuel.code = :code', { code });

    return this;
  }

  findByDate(date: Date) {
    this.queryBuilder.andWhere('date = :date', { date });

    return this;
  }

  findByDateRanges(since: Date, until: Date) {
    this.queryBuilder.andWhere('date between :since and :until', {
      since,
      until,
    });

    return this;
  }

  async search(limit?: number) {
    return await this.queryBuilder.limit(limit).getMany();
  }
}
