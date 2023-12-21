import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import UserDTO from '../../auth/domain/dto/user.dto';

interface UserPaymentInfo {
  client_group: string;
  is_boleto_blocked: string;
  is_antecipated_payment: number;
  group_min_payment_value: number;
  client_min_payment_value: number;
}

@Injectable()
export class GetUserPaymentOptionsService {
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
  ) {}

  userPaymentOptions: UserPaymentInfo;

  employeer_client_groups = ['026', '018', '085'];

  async execute(user: UserDTO): Promise<GetUserPaymentOptionsService> {
    try {
      const userInfo: UserPaymentInfo[] = await this.datasource.query(`
        SELECT
          A1_ZGRPCLI as client_group,
          A1_ZMPBOL as is_boleto_blocked,
          A1_ZINFER as client_min_payment_value,
          E4_INFER as group_min_payment_value,
          E4_ZGCPA as is_antecipated_payment
        FROM SA1010
          INNER JOIN SE4010 ON SE4010.E4_CODIGO = SA1010.A1_COND
        WHERE A1_CGC = '${user.A1_CGC}'
      `);

      this.userPaymentOptions = userInfo[0];

      return this;
    } catch (error) {
      console.error('GetLevelFromUserService::execute - ', error);
    }
  }

  isAEmployeer(): boolean {
    return this.employeer_client_groups.includes(
      this.userPaymentOptions.client_group,
    );
  }

  isAntecipatedPaymentUser(): boolean {
    return this.userPaymentOptions.is_antecipated_payment !== 0;
  }

  canPayByBoleto(): boolean {
    return this.userPaymentOptions.is_boleto_blocked !== '1';
  }

  minimumPaymentValue(): number {
    const { client_min_payment_value, group_min_payment_value } =
      this.userPaymentOptions;

    return client_min_payment_value
      ? client_min_payment_value
      : group_min_payment_value;
  }
}
