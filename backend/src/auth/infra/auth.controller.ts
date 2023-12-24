import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export default class AuthController {
  @Get('/')
  async check() {
    return { ok: true };
  }
}
