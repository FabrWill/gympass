import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AuthModule from './auth/auth.module';
import { ApiConfigService } from './config/api_config.service';
import { DatabaseModule } from './database/database.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    PaymentModule,
  ],
  providers: [ApiConfigService],
})
export class AppModule {}
