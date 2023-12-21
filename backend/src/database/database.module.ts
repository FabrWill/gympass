import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from 'src/config/api_config.service';
import { ConfigModule } from 'src/config/config.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => configService.database,
    }),
  ],
})
export class DatabaseModule {}
