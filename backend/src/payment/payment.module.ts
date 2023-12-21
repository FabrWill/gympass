import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/entities/order.entity';
import { InnpayModule } from 'src/innpay/innpay.module';
import { User } from './domain/entities/user.entity';
import { GetPaymentMethodsByUserService } from './services/get_payment_methods_by_user.service';
import GetPaymentMethodInfoFromOrderService from './services/get_payment_method_from_order.service';
import { GetUserPaymentOptionsService } from './services/get_user_payment_options.service';
import { UpdatePaymentMethodByCartService } from './services/update_payment_method_by_cart.service';
import { GetPaymentMethodsByUserController } from './infra/controllers/get_payment_methods_by_user.controller';
import { UpdatePaymentMethodByCartController } from './infra/controllers/update_payment_method_by_cart.controller';
import { PixModule } from './submodules/pix/pix.module';
import { CreditCardModule } from './submodules/credit_card/credit_card.module';
import { BoletoModule } from './submodules/boleto/boleto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User]),
    InnpayModule,
    forwardRef(() => PixModule),
    forwardRef(() => CreditCardModule),
    forwardRef(() => BoletoModule),
  ],
  providers: [
    GetUserPaymentOptionsService,
    GetPaymentMethodsByUserService,
    GetPaymentMethodInfoFromOrderService,
    UpdatePaymentMethodByCartService,
  ],
  controllers: [
    GetPaymentMethodsByUserController,
    UpdatePaymentMethodByCartController,
  ],
  exports: [
    GetPaymentMethodsByUserService,
    GetPaymentMethodInfoFromOrderService,
    GetUserPaymentOptionsService,
    UpdatePaymentMethodByCartService,
    InnpayModule,
  ],
})
export class PaymentModule {}
