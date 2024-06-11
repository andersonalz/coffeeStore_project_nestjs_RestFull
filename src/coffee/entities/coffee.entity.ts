import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity('coffees') // sql table name and is lowercase but you want change name you can pass the string to Entity() decorator
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  // @Column('json', { nullable: true }) // flavors is different because is array and we should pass 'json' argument to decorator
  @JoinTable()
  @ManyToMany(() => Flavor, (flavors) => flavors.coffees, {
    cascade: true,
  })
  flavors: [Flavor];
}
//each colum not nullable that means require
