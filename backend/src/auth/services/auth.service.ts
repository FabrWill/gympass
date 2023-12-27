import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/entities/user';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../domain/dtos/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const validPassword = await bcrypt.compare(user.password, password);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
