import { User } from 'src/auth/domain/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => Partner)
  @JoinTable({
    name: 'partner_product',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'partner_id',
      referencedColumnName: 'id',
    },
  })
  partners: Partner[];

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
