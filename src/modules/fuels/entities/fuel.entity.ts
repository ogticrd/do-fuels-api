import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Price } from './price.entity';

@Entity('fuels', { schema: 'public' })
export class Fuel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  @Index()
  name: string;

  @Column({ name: 'code', type: 'varchar', nullable: true })
  @Index()
  code: string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => Price, (price) => price.fuel)
  prices: Price[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
