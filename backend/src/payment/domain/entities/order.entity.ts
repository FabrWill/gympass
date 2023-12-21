import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentMethod } from '../enum/payment.enum';
import { User } from './user.entity';
import { VarcharToIsoColumn } from 'src/database/domain/decorators/varchar_to_iso_column.decorator';

@Entity('ZK1010')
export class Order {
  @Column({ name: 'ZK1_CUPOM', nullable: true })
  cupom: string | null;

  @PrimaryColumn({ name: 'ZK1_IDAPP' })
  idapp: string;

  @Column({ name: 'ZK1_PEDIDO' })
  order_code: string;

  @Column({ name: 'R_E_C_N_O_' })
  recno: number;

  @Column({ name: 'ZK1_STATUS' })
  status: string;

  @Column({ name: 'ZK1_CLIENT' })
  customer_identification: string;

  @Column({ name: 'ZK1_VLRBO', type: 'float' })
  bonification_value: number;

  @Column({ name: 'ZK1_VLRFT', type: 'float' })
  freight_value: number;

  @Column({ name: 'ZK1_VLRST', type: 'float' })
  st_value: number;

  @Column({ name: 'ZK1_VLTOT', type: 'float' })
  total_value: number;

  @Column({ name: 'ZK1_ZMPGIT' })
  payment_identification: string;

  @Column({ name: 'ZK1_ZMPGID' })
  payment_transaction_info: string;

  @Column({ name: 'ZK1_ZMPGTP', type: 'char' })
  payment_method: PaymentMethod;

  @Column({ name: 'ZK1_ZPGBCO', default: '001' })
  payment_bank: string;

  @Column({ name: 'ZK1_ZPGAGE', default: '3540' })
  payment_agency: string;

  @Column({ name: 'ZK1_ZPGCTA', default: '15612' })
  payment_account: string;

  @VarcharToIsoColumn({ name: 'ZK1_ZMPEXP', type: 'nvarchar' })
  payment_expiration: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'ZK1_CLIENT', referencedColumnName: 'identification' })
  user: User;
}
