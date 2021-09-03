import { Repository, EntityRepository } from 'typeorm';

import { Fuel } from '../entities';

@EntityRepository(Fuel)
export class FuelsRepository extends Repository<Fuel> {}
