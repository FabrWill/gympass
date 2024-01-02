import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductDTO from '../domain/dtos/product.dto';
import { Product } from '../domain/entities/product.entity';
import { Partner } from '../domain/entities/partner.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async upsertProducts(
    toRegisterProducts: ProductDTO[],
    partner: Partner,
  ): Promise<Product[]> {
    const products = [];
    await this.productRepository.delete({ partner_id: partner.id });

    for (const toRegister of toRegisterProducts) {
      const product = new Product();

      product.price = toRegister.price;
      product.promotional_price = toRegister.partner_price;
      product.description = toRegister.description;
      product.partner = partner;

      const savedProduct = await this.productRepository.save(product);
      products.push(savedProduct);
    }

    return products;
  }
}
