import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDTO from '../../../../auth/domain/dto/user.dto';
import { Order } from '../../../domain/entities/order.entity';
import { InnpayProvider } from 'src/innpay/infra/http/innpay.provider';
import Mask from 'src/shared/helpers/mask';
import { PixDTO } from 'src/innpay/domain/dto/pix.dto';
import { DateTime } from 'luxon';
import { ApiConfigService } from 'src/config/api_config.service';
import { PaymentMethod } from '../../../domain/enum/payment.enum';

@Injectable()
export class GetOrCreatePixService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly config: ApiConfigService,

    @Inject(forwardRef(() => InnpayProvider))
    private readonly innpay: InnpayProvider,
  ) {}

  async execute(user: UserDTO, idapp: string): Promise<any> {
    try {
      const order = await this.orderRepository.findOneOrFail({
        where: {
          idapp: idapp,
        },
        relations: ['user'],
      });

      if (!order) {
        throw new HttpException('Pedido não encontrado', 404);
      }

      // TO-DO adicionar validação de pagamento e tipo de pagamento no pedido

      let response: PixDTO | null;

      const isToCreate = !`${order.payment_identification}`.trim();

      if (isToCreate) {
        response = await this.create(order, user);
      } else {
        response = await this.update(order);
      }

      this.updatePaymentOnPaymentGenerated(order, response, isToCreate);

      return {
        ...response,
        order: order,
      };
    } catch (error) {
      console.error('GetOrCreatePixService::execute - ');

      console.error(JSON.stringify(error?.response?.data));

      throw error;
    }
  }

  private async updatePaymentOnPaymentGenerated(
    order: Order,
    response: PixDTO,
    isToCreate = false,
  ) {
    try {
      const updateData: Partial<Order> = {
        payment_identification: response.id,
        payment_transaction_info: response.code,
        payment_bank: this.config.bankAccount.bank,
        payment_agency: this.config.bankAccount.agency,
        payment_method: PaymentMethod.PIX,
        payment_account: this.config.bankAccount.account,
      };

      if (isToCreate) {
        updateData.payment_expiration = DateTime.now()
          .plus({
            days: 1,
          })
          .toJSDate();
      }

      await this.orderRepository.update(
        {
          idapp: order.idapp,
        },
        updateData,
      );
    } catch (error) {
      console.error(
        'GetOrCreatePixService::updatePaymentOnPaymentGenerated - ',
        error,
      );

      console.error(JSON.stringify(error?.response?.data));
    }
  }

  private async create(order: Order, user: UserDTO): Promise<PixDTO> {
    const paymentId = order.idapp.replace('01010101', '');

    const document = this.config.isProduction
      ? Mask.getFormattedCpfOrCnpj(
          `${order.user ? order.user.identification : user.A1_CGC}`,
        )
      : Mask.getFormattedCpfOrCnpj(this.config.innpayPayer.number);

    const data = {
      id: paymentId,
      value: Number.parseFloat(order.total_value.toFixed(2)),
      name: `Pedido ${paymentId}`,
      document: document,
      expiration: 3600 * 24,
    };

    const request = await this.innpay.request<PixDTO>('post', 'pix', data);

    return request;
  }

  private async update(order: Order): Promise<PixDTO> {
    if (new Date() < order.payment_expiration) {
      const request = await this.innpay.request<PixDTO>(
        'get',
        `pix/${order.payment_identification}`.trim(),
        {},
      );

      return request;
    }

    return await this.innpay.request<PixDTO>(
      'patch',
      `pix/${order.payment_identification}`.trim(),
      {},
    );
  }
}
