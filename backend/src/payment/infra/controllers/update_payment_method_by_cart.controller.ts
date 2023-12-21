import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { PaymentMethod } from 'src/payment/domain/enum/payment.enum';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePaymentMethodDTO } from 'src/payment/domain/dto/update_payment_method.dto';
import { UpdatePaymentMethodByCartService } from 'src/payment/services/update_payment_method_by_cart.service';
import { AuthUser } from 'src/auth/domain/decorators/auth_user.decorator';

@Controller('payment_methods')
export class UpdatePaymentMethodByCartController {
  constructor(private readonly service: UpdatePaymentMethodByCartService) {}

  @Put('/')
  @UseGuards(AuthGuard('jwt'))
  async updatePaymentMethod(
    @AuthUser() user,
    @Body() data: UpdatePaymentMethodDTO,
  ): Promise<PaymentMethod[]> {
    return await this.service.execute(user, data);
  }
}
