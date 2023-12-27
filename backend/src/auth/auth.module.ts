import { Module } from '@nestjs/common';
import AuthController from './infra/auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import ApplicationConfigService from 'src/config/application_config.service';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ApplicationConfigService],
      useFactory: async (
        config: ApplicationConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: '1d' },
        global: true,
      }),
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export default class AuthModule {}
