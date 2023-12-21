import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentMethod } from 'src/payment/domain/enum/payment.enum';
import { GetPaymentMethodsByUserService } from 'src/payment/services/get_payment_methods_by_user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/domain/decorators/auth_user.decorator';
import GetPaymentMethodInfoFromOrderService from 'src/payment/services/get_payment_method_from_order.service';

@Controller()
export class GetPaymentMethodsByUserController {
  constructor(
    private readonly getPaymentMethodsByUserService: GetPaymentMethodsByUserService,
    private readonly getPaymentMethodInfoFromOrderService: GetPaymentMethodInfoFromOrderService,
  ) {}

  @Get('/payment_methods')
  @UseGuards(AuthGuard('jwt'))
  async getPaymentMethodsByUser(@AuthUser() user): Promise<PaymentMethod[]> {
    return await this.getPaymentMethodsByUserService.execute(user);
  }

  @Get('/payment_methods/:idapp')
  async getPaymentMethodInfoFromOrder(
    @AuthUser() user,
    @Param('idapp') idapp: string,
  ): Promise<any> {
    return await this.getPaymentMethodInfoFromOrderService.execute(user, idapp);
  }
}
