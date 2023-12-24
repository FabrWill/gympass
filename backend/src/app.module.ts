import { Module } from '@nestjs/common';
import { ApplicationConfigModule } from './config/application_config.module';
import { DatabaseModule } from './database/database.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [ApplicationConfigModule, DatabaseModule, AuthModule],
})
export class AppModule {}
