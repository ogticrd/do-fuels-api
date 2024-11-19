import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Fuel } from './fuel.entity';

@Entity('prices', { schema: 'public' })
export class Price {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Fuel, (fuel) => fuel.prices, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fuel_id' })
  @Index()
  fuel: Fuel;

  @Column({ name: 'price', type: 'decimal', nullable: false })
  price: number;

  @Column({ name: 'date', type: 'date', nullable: false })
  @Index()
  date: Date;

  @Column({ name: 'publication_date', type: 'date', nullable: false })
  publicationDate: Date;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Date;
}
