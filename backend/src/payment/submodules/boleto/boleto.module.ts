import { Module, forwardRef } from '@nestjs/common';
import { PaymentModule } from 'src/payment/payment.module';
import CreateBoletoService from './services/create_boleto.service';
import S3BoletoService from './services/s3_boleto.service';
import { S3Module } from 'nestjs-s3';
import { ApiConfigService } from 'src/config/api_config.service';
import GetBoletoIdService from './services/get_boleto_id.service';
import { GetOrCreateBoletoService } from './services/get_or_create_boleto.service';
import { GetOrCreateBoletoController } from './infra/controllers/get_or_create_boleto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/payment/domain/entities/order.entity';
import { User } from 'src/payment/domain/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => PaymentModule),
    TypeOrmModule.forFeature([Order, User]),
    S3Module.forRootAsync({
      useFactory: (configService: ApiConfigService) => ({
        config: {
          accessKeyId: configService.S3Config.accessKeyId,
          secretAccessKey: configService.S3Config.secretAccessKey,
          region: configService.S3Config.region,
        },
      }),

      inject: [ApiConfigService],
    }),
  ],
  providers: [
    CreateBoletoService,
    S3BoletoService,
    GetBoletoIdService,
    GetOrCreateBoletoService,
  ],
  controllers: [GetOrCreateBoletoController],
})
export class BoletoModule {}
