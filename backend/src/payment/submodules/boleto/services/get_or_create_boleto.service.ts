import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserDTO from '../../../../auth/domain/dto/user.dto';
import { Order } from '../../../domain/entities/order.entity';
import CreateBoletoService from './create_boleto.service';
import DateHelper from 'src/shared/helpers/date.helper';
import S3BoletoService from './s3_boleto.service';
import FileHelper from 'src/shared/helpers/file.helper';
import { ApiConfigService } from 'src/config/api_config.service';
import { PaymentMethod } from '../../../domain/enum/payment.enum';

@Injectable()
export class GetOrCreateBoletoService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly s3BoletoService: S3BoletoService,

    private readonly createBoletoService: CreateBoletoService,

    private readonly config: ApiConfigService,
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

      let result: any;

      const isUpdating = `${order.payment_identification}`.trim();

      if (isUpdating) {
        const s3File = await this.s3BoletoService.read(
          order.payment_identification,
        );

        const file = await FileHelper.fileToBase64(s3File);

        result = {
          pdfBase64: file,
          serialNumber: order.payment_transaction_info,
        };
      } else {
        result = await this.createBoletoService.execute(order, user);

        await this.s3BoletoService.upload(
          result.pdfBase64,
          result.boleto.customer_title_number,
        );

        this.updatePaymentOnPaymentGenerated(order, result);
      }

      return {
        ...result,
        order: order,
      };
    } catch (error) {
      console.error('GetOrCreateBoletoService::execute - ', error);

      console.error(JSON.stringify(error?.response?.data));

      throw error;
    }
  }

  private async updatePaymentOnPaymentGenerated(order: Order, response: any) {
    try {
      const updateData: Partial<Order> = {
        payment_identification: response.boleto.customer_title_number,
        payment_transaction_info: response.serialNumber,
        payment_expiration: DateHelper.getNextWorkDay().toJSDate(),
        payment_method: PaymentMethod.BOLETO,
        payment_bank: this.config.bankAccount.bank,
        payment_agency: this.config.bankAccount.agency,
        payment_account: this.config.bankAccount.account,
      };

      await this.orderRepository.update(
        {
          idapp: order.idapp,
        },
        updateData,
      );
    } catch (error) {
      console.error(
        'GetOrCreatePixService::updatePaymentOnPaymentGenerated -',
        error,
      );
    }
  }
}
