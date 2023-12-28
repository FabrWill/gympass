import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('partner_product')
export class PartnerProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partner_id: number;

  @Column()
  product_id: number;
}
