import { User } from 'src/auth/domain/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Partner } from './partner.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  promotional_price: number;

  @Column()
  description: string;

  @Column()
  partner_id: number;

  @ManyToOne(() => Partner, (partner) => partner.products)
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_assigned_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
