import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    if (
      !token ||
      !token.startsWith('Bearer ') ||
      token !== `Bearer ${process.env.API_KEY}`
    ) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}
