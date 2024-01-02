import { Module } from '@nestjs/common';
import { ApplicationConfigModule } from './config/application_config.module';
import { DatabaseModule } from './database/database.module';
import AuthModule from './auth/auth.module';
import { PartnersModule } from './partners/partners.module';

@Module({
  imports: [
    ApplicationConfigModule,
    DatabaseModule,
    AuthModule,
    PartnersModule,
  ],
})
export class AppModule {}
