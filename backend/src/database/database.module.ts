import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ApplicationConfigService from 'src/config/application_config.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ApplicationConfigService) =>
        config.databaseSettings,
      inject: [ApplicationConfigService],
    }),
  ],
})
export class DatabaseModule {}
