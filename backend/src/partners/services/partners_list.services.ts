import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../domain/entities/partner.entity';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
  ) {}

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }
}
