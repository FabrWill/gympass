import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/domain/decorators/auth_user.decorator';
import { GetOrCreateCreditService } from '../../services/get_or_create_credit.service';
import CreditCardDTO from '../../domain/dto/credit_card.dto';

@Controller()
export class GetOrCreateCreditController {
  constructor(private readonly service: GetOrCreateCreditService) {}

  @Post('/payment_methods/CREDIT/:idapp')
  @UseGuards(AuthGuard('jwt'))
  async getOrCreateBoleto(
    @AuthUser() user,
    @Param('idapp') idapp: string,
    @Body() creditInfo?: CreditCardDTO,
  ): Promise<any> {
    return await this.service.execute(user, idapp, creditInfo);
  }
}
