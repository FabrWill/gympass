import { IsString, IsNotEmpty } from 'class-validator';
import { PaymentMethod } from '../enum/payment.enum';

export class UpdatePaymentMethodDTO {
  @IsNotEmpty()
  @IsString()
  cart_id: string;

  @IsNotEmpty()
  @IsString()
  payment_method: PaymentMethod;
}
