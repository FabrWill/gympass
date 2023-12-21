import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from 'src/config/api_config.service';
import { ConfigModule } from 'src/config/config.module';
import { InnpayProvider } from './infra/http/innpay.provider';

@Module({
  imports: [
    JwtModule.register({}),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
        baseURL: apiConfigService.innpayConfig.url,
      }),
    }),
  ],
  providers: [InnpayProvider],
  exports: [InnpayProvider],
})
export class InnpayModule {}
