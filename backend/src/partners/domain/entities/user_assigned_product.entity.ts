import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users_assigned_products')
export class UserAssignedProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @Column()
  expiration_date: Date;

  @Column()
  contracted_price: number;
}
