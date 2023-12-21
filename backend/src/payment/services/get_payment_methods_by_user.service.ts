import { Injectable } from '@nestjs/common';
import UserDTO from '../../auth/domain/dto/user.dto';
import { PaymentMethod } from 'src/payment/domain/enum/payment.enum';
import { GetUserPaymentOptionsService } from './get_user_payment_options.service';

@Injectable()
export class GetPaymentMethodsByUserService {
  constructor(private getUserPaymentOptions: GetUserPaymentOptionsService) {}

  employeer_client_groups = ['026', '018', '085'];

  async execute(user: UserDTO): Promise<PaymentMethod[]> {
    try {
      const paymentMethods: PaymentMethod[] = [];

      const userPaymentInfo = await this.getUserPaymentOptions.execute(user);

      if (userPaymentInfo.isAEmployeer()) {
        return [PaymentMethod.PIX];
      }

      paymentMethods.push(...[PaymentMethod.PIX, PaymentMethod.CREDIT_CARD]);

      if (userPaymentInfo.canPayByBoleto()) {
        paymentMethods.push(PaymentMethod.BOLETO);
      }

      return paymentMethods;
    } catch (error) {
      console.error('GetLevelFromUserService::execute - ', error);
    }
  }
}
