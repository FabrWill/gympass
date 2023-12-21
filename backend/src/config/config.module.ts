import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './api_config.service';

@Global()
@Module({
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ConfigModule {}
