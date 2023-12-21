import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('SA1010')
export class User {
  @PrimaryColumn({ name: 'A1_CGC' })
  identification: string;

  @Column({ name: 'A1_NREDUZ' })
  name: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
