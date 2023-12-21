import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetOrCreatePixService } from '../../services/get_or_create_pix.service';

@Controller()
export class GetOrCreatePixController {
  constructor(private readonly service: GetOrCreatePixService) {}

  @Post('/payment_methods/PIX/:idapp')
  @UseGuards(AuthGuard('jwt'))
  async getOrCreatePixController(
    @Request() request,
    @Param('idapp') idapp: string,
  ): Promise<any> {
    return await this.service.execute(request.user, idapp);
  }
}
