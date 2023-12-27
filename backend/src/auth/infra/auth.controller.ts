import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../domain/dtos/login.dto';
import { User } from '../domain/entities/user';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.authService.login(loginUserDto);

    return user;
  }
}
