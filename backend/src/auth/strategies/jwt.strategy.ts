import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ApiConfigService } from 'src/config/api_config.service';
import UserDTO from '../domain/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ApiConfigService) {
    super({
      jwtFromRequest: (req) => {
        return req.headers.token;
      },
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: any) {
    return payload.userData as UserDTO;
  }
}
