// partner.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PartnerRegisterDTO from 'src/partners/domain/dtos/partner_register.dto';
import { Partner } from 'src/partners/domain/entities/partner.entity';
import { PartnerService } from 'src/partners/services/partners.services';

@ApiTags('Partner')
@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async findAll(): Promise<Partner[]> {
    return this.partnerService.findAll();
  }

  @Post('/place')
  async create(@Body() partner: PartnerRegisterDTO): Promise<Partner> {
    return this.partnerService.create(partner);
  }
}
