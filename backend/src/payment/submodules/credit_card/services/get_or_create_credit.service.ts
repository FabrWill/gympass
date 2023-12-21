import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDTO from '../../../../auth/domain/dto/user.dto';
import { Order } from '../../../domain/entities/order.entity';
import { InnpayProvider } from 'src/innpay/infra/http/innpay.provider';
import { PixDTO } from 'src/innpay/domain/dto/pix.dto';
import { DateTime } from 'luxon';
import { ApiConfigService } from 'src/config/api_config.service';
import { PaymentMethod } from '../../../domain/enum/payment.enum';
import CreditCardDTO, {
  InnpayCreditCardTransactionDTO,
} from '../domain/dto/credit_card.dto';

@Injectable()
export class GetOrCreateCreditService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @Inject(forwardRef(() => InnpayProvider))
    private readonly innpay: InnpayProvider,

    private readonly config: ApiConfigService,
  ) {}

  async execute(
    user: UserDTO,
    idapp: string,
    creditInfo?: CreditCardDTO,
  ): Promise<any> {
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

      if (!creditInfo.card) {
        return {
          response: {},
          order: order,
        };
      }

      let response: PixDTO | null;

      const isUpdating = `${order.payment_identification}`.trim();

      if (isUpdating) {
        response = await this.create(order, user, creditInfo);
        this.updatePaymentOnPaymentGenerated(order, response, true);
        // throw new HttpException('Pagamento já realizado', 403);
      } else {
        response = await this.create(order, user, creditInfo);
        this.updatePaymentOnPaymentGenerated(order, response, true);
      }

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

  private async create(
    order: Order,
    user: UserDTO,
    creditInfo: CreditCardDTO,
  ): Promise<PixDTO> {
    const paymentId = order.idapp.replace('01010101', '');

    const transaction: InnpayCreditCardTransactionDTO = {
      reference: paymentId,
      transactions: [
        {
          card: {
            ...creditInfo.card,
            ...this.config.innpayCreditCardConfig.card,
          },
          payment: {
            ...creditInfo.payment,
            value: order.total_value,
          },
        },
      ],
    };

    const request = await this.innpay.request<PixDTO>(
      'post',
      'cards',
      transaction,
    );

    return request;
  }
}
