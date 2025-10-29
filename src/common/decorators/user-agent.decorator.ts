import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const userAgent = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request.headers['user-agent'] || 'Unknown';
  },
);
