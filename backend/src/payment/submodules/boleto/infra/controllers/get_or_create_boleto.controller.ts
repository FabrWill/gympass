import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/domain/decorators/auth_user.decorator';
import { GetOrCreateBoletoService } from '../../services/get_or_create_boleto.service';

@Controller()
export class GetOrCreateBoletoController {
  constructor(private readonly service: GetOrCreateBoletoService) {}

  @Post('/payment_methods/BOLETO/:idapp')
  @UseGuards(AuthGuard('jwt'))
  async getOrCreateBoleto(
    @AuthUser() user,
    @Param('idapp') idapp: string,
  ): Promise<any> {
    return await this.service.execute(user, idapp);
  }
}
