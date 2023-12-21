import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  BoletoConfigDTO,
  BoletoPayerDTO,
} from 'src/innpay/domain/dto/boleto.dto';
import CreditCardDTO from 'src/payment/submodules/credit_card/domain/dto/credit_card.dto';

@Injectable()
export class ApiConfigService {
  constructor(private config: ConfigService) {}

  get S3Config() {
    return {
      accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
      region: this.config.get('AWS_REGION'),
      bucket: this.config.get('AWS_BUCKET'),
    };
  }

  get bankAccount() {
    return {
      bank: '001',
      agency: '3540',
      account: '15612',
    };
  }

  get innpayPayer(): Partial<BoletoPayerDTO> {
    if (this.isProduction) {
      return {};
    }

    return {
      number: '05866439905',
      phone: '4899641266',
      type: 1,
    };
  }

  get innpayCreditCardConfig(): Partial<CreditCardDTO> {
    if (this.isProduction) {
      return {};
    }

    return {
      card: {
        number: '5277696455399733',
        cvv: '123',
        expiration_date: '01/28',
        name: 'Teste',
      },
    };
  }

  get innpay(): BoletoConfigDTO {
    if (this.isProduction) {
      return {
        download: false,
        all: true,
        wallet_number: 17,
        wallet_variation_number: 19,
        mode_code: 4,
        agreement_number: Number.parseInt(
          `${this.config.get('BB_INTEGRATION_CODE')}`,
        ),
        code_of_type_title: 2,
        partial_receipt: 'N',
      };
    }

    return {
      download: false,
      all: true,
      agreement_number: 3128557,
      wallet_number: 17,
      wallet_variation_number: 35,
      mode_code: 1,
      code_of_type_title: 2,
      partial_receipt: 'N',
    };
  }

  get database(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.config.get('DATABASE_HOST'),
      port: this.config.get('DATABASE_PORT'),
      database: this.config.get('DATABASE_NAME'),
      username: this.config.get('DATABASE_USER'),
      password: this.config.get('DATABASE_PASSWORD'),
      logging: false,
      entities: [__dirname + '../**/*.entity{.ts,.js}'],
      options: {
        trustServerCertificate: true,
        encrypt: true,
      },
      autoLoadEntities: true,
    };
  }

  get jwtSecret() {
    return this.config.get('JWT_SECRET');
  }

  get port() {
    return this.config.get('PORT');
  }

  get isDevelopment() {
    return this.config.get('NODE_ENV') === 'LOCAL';
  }

  get isProduction() {
    return this.config.get('NODE_ENV') === 'PRODUCTION';
  }

  get innpayConfig() {
    return {
      url: this.config.get('INNPAY_URL'),
      user: this.config.get('INNPAY_USER'),
      password: this.config.get('INNPAY_PASSWORD'),
    };
  }
}
