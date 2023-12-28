// partner.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Partner } from 'src/partners/domain/entities/partner.entity';
import { PartnerService } from 'src/partners/services/partners_list.services';

@Controller('partners')
@ApiTags('Partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async findAll(): Promise<Partner[]> {
    return this.partnerService.findAll();
  }
}
