import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/domain/decorators/auth_user.decorator';
import { InstallmentsService } from '../../services/installments.service';

@Controller()
export class InstallmentsController {
  constructor(private readonly service: InstallmentsService) {}

  @Get('/installments/:idapp')
  @UseGuards(AuthGuard('jwt'))
  async getOrCreateBoleto(
    @AuthUser() user,
    @Param('idapp') idapp: string,
  ): Promise<any> {
    return await this.service.execute(user, idapp);
  }
}
