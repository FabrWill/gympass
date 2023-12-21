import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiConfigService } from 'src/config/api_config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        privateKey: configService.jwtSecret,
        signOptions: {
          algorithm: 'RS256',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ApiConfigService],
    }),
    PassportModule,
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export default class AuthModule {}
