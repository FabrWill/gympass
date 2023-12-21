import { HttpException, Injectable } from '@nestjs/common';
import UserDTO from 'src/auth/domain/dto/user.dto';
import { Order } from '../domain/entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class GetPaymentMethodInfoFromOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async execute(user: UserDTO, idapp: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: [
          {
            idapp: idapp,
          },
          {
            order_code: idapp,
          },
        ],
        relations: ['user'],
      });

      if (!order) {
        throw new HttpException('Pedido não encontrado', 404);
      }

      return {
        idapp: order.idapp,
        payment_method: `${order.payment_method}`.trim(),
        payment_identification: `${order.payment_identification}`.trim(),
        payment_transaction_info: `${order.payment_transaction_info}`.trim(),
      };
    } catch (error) {
      console.error('GetPaymentMethodInfoFromOrderService::execute - ', error);
      throw error;
    }
  }
}
