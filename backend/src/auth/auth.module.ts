import { Module } from '@nestjs/common';
import AuthController from './infra/auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import ApplicationConfigService from 'src/config/application_config.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ApplicationConfigService],
      useFactory: async (
        config: ApplicationConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: '60m' },
        global: true,
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export default class AuthModule {}
