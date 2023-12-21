import { Module, forwardRef } from '@nestjs/common';
import { PaymentModule } from 'src/payment/payment.module';
import { GetOrCreatePixService } from './services/get_or_create_pix.service';
import { GetOrCreatePixController } from './infra/controllers/get_or_create_pix.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/payment/domain/entities/order.entity';
import { User } from 'src/payment/domain/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => PaymentModule),
    TypeOrmModule.forFeature([Order, User]),
  ],
  providers: [GetOrCreatePixService],
  controllers: [GetOrCreatePixController],
})
export class PixModule {}
