import { Module, forwardRef } from '@nestjs/common';
import { PaymentModule } from 'src/payment/payment.module';
import { GetOrCreateCreditService } from './services/get_or_create_credit.service';
import { InstallmentsService } from './services/installments.service';
import { GetOrCreateCreditController } from './infra/controllers/get_or_create_credit.controller';
import { InstallmentsController } from './infra/controllers/installments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/payment/domain/entities/order.entity';
import { User } from 'src/payment/domain/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => PaymentModule),
    TypeOrmModule.forFeature([Order, User]),
  ],
  providers: [GetOrCreateCreditService, InstallmentsService],
  controllers: [GetOrCreateCreditController, InstallmentsController],
})
export class CreditCardModule {}
