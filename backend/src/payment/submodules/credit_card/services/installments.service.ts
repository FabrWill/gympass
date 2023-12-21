import { Injectable } from '@nestjs/common';
import UserDTO from '../../../../auth/domain/dto/user.dto';
import { Order } from '../../../domain/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetUserPaymentOptionsService } from '../../../services/get_user_payment_options.service';

interface InstallmentsDTO {
  installments: number;
}

@Injectable()
export class InstallmentsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly getUserPaymentOptions: GetUserPaymentOptionsService,
  ) {}

  async execute(user: UserDTO, idapp: string): Promise<InstallmentsDTO> {
    try {
      const order = await this.orderRepository.findOneOrFail({
        where: {
          idapp: idapp,
        },
        relations: ['user'],
      });

      const userPaymentInfo = await this.getUserPaymentOptions.execute(user);

      if (
        userPaymentInfo.isAEmployeer() ||
        userPaymentInfo.isAntecipatedPaymentUser()
      ) {
        return { installments: 1 };
      }

      const minPaymentValue = userPaymentInfo.minimumPaymentValue();

      if (minPaymentValue <= 0) {
        return { installments: 1 };
      }

      const installments = Math.ceil(order.total_value / minPaymentValue);

      return { installments };
    } catch (error) {
      console.error('GetLevelFromUserService::execute - ', error);
    }
  }
}
