import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './domain/entities/partner.entity';
import { PartnerController } from './infra/controllers/partners.controller';
import { PartnerService } from './services/partners.services';
import { ProductService } from './services/product.services';
import { Product } from './domain/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partner, Product])],
  controllers: [PartnerController],
  providers: [PartnerService, ProductService],
})
export class PartnersModule {}
