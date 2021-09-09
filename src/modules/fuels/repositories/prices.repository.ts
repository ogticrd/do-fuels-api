import {
  AbstractRepository,
  EntityRepository,
  SelectQueryBuilder,
} from 'typeorm';

import { Price } from '../entities';

@EntityRepository(Price)
export class PricesRepository extends AbstractRepository<Price> {
  private queryBuilder: SelectQueryBuilder<Price>;

  init() {
    this.queryBuilder = this.repository
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
