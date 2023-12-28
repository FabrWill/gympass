import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import PartnerType from '../enums/partner_type.enum';

@Entity('partner')
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  google_place_id: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  image_url: string;

  @Column({ type: 'enum', enum: PartnerType })
  type: PartnerType;

  @Column()
  rating: number;
}
