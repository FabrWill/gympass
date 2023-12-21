import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'src/config/api_config.service';
import { InnpayProvider } from 'src/innpay/infra/http/innpay.provider';
import { Order } from '../../../domain/entities/order.entity';
import { BoletoDTO } from 'src/innpay/domain/dto/boleto.dto';
import UserDTO from 'src/auth/domain/dto/user.dto';
import GetBoletoIdService from './get_boleto_id.service';
import { DateTime } from 'luxon';
import DateHelper from 'src/shared/helpers/date.helper';

@Injectable()
export default class CreateBoletoService {
  constructor(
    private readonly config: ApiConfigService,
    private readonly innpay: InnpayProvider,
    private readonly getBoletoId: GetBoletoIdService,
  ) {}

  async execute(order: Order, user: UserDTO): Promise<any> {
    const boleto = await this.build(order, user);

    const request: any = await this.innpay.request(
      'post',
      'bank-slips/banco-brasil',
      boleto,
    );

    return { ...request, boleto };
  }

  async build(order: Order, user: UserDTO): Promise<BoletoDTO> {
    const boletoId = await this.getBoletoId.execute();
    const creation_date = DateTime.now().toFormat('yyyy-MM-dd');
    const expiration_date = DateHelper.getNextWorkDay();

    const data = {
      issue_date: creation_date,
      due_date: expiration_date.toFormat('yyyy-MM-dd'),
      tax_amount: 0.0,
      original_value: order.total_value,
      quantity_of_protest_day: 0,
      accept_code: 'N',
      description_of_type_title: '0',
      customer_title_number: boletoId,
      beneficiary_title_number: `${order.recno}`,
      payer: {
        type: user.A1_LOJA == '0000' ? 1 : 2,
        number: user.A1_CGC,
        name: user.A1_NOME,
        address: user.A1_ENDCOB,
        postal_code: user.A1_CEP,
        city: user.A1_MUN,
        neighborhood: user.A1_BAIRRO,
        state_letter: user.A1_EST,
        phone: `${user.A1_DDD}${user.A1_TEL}`.replace(/\D/g, ''),
        ...this.config.innpayPayer,
      },
      interest: {
        type: 0,
        value: 0,
        percentage: 0,
      },
      fine: {
        type: 0,
        percentage: 0,
        value: 0,
      },
      discount: {
        type: 0,
        percentage: 0,
        value: 0,
      },
      ...this.config.innpay,
    };

    return data;
  }

  getBeneficiaryTitleNumber(): string {
    return '';
  }
}
