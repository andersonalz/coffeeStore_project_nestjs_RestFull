import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Index() for define composite index to multiple column and pass array column name inside array in decorator ['name']
@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
  // @Index()
  @Column()
  name: string;

  @Column()
  pyload: Record<string, any>;
}
