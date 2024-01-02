import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from '../domain/entities/partner.entity';
import PartnerRegisterDTO from '../domain/dtos/partner_register.dto';
import { ProductService } from './product.services';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
    @Inject()
    private productService: ProductService,
  ) {}

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  async create(partner: PartnerRegisterDTO): Promise<Partner> {
    const saved = await this.partnerRepository.save(partner);
    const products = await this.productService.upsertProducts(
      partner.products,
      saved,
    );
    console.log(partner, products);

    return saved;
  }
}
