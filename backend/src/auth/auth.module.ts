import { Module } from '@nestjs/common';
import AuthController from './infra/auth.controller';

@Module({
  controllers: [AuthController],
})
export default class AuthModule {}
