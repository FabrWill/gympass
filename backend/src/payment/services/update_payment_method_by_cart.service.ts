import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDTO from '../../auth/domain/dto/user.dto';
import { UpdatePaymentMethodDTO } from '../domain/dto/update_payment_method.dto';
import { Order } from '../domain/entities/order.entity';

@Injectable()
export class UpdatePaymentMethodByCartService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async execute(user: UserDTO, data: UpdatePaymentMethodDTO): Promise<any> {
    try {
      const order = await this.orderRepository.findOneOrFail({
        where: {
          idapp: data.cart_id,
        },
      });

      if (!order) {
        throw new HttpException('Cart not found', 404);
      }

      order.payment_method = data.payment_method;

      return await this.orderRepository.save(order);
    } catch (error) {
      console.error('GetLevelFromUserService::execute - ', error);

      throw error;
    }
  }
}
