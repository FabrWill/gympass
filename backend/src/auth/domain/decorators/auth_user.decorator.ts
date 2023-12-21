import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import UserDTO from '../dto/user.dto';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDTO => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDTO;
  },
);
