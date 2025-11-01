import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import type { Request } from 'express';

type RequestWithUser = Request & { user?: User };

export const Authorized = createParamDecorator<keyof User | undefined>(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    return data ? user[data] : user;
  },
);
