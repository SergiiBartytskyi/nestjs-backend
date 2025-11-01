import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import type { Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import type { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Authorization()
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Authorized() user: User) {
    return user;
  }
}
