import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequest } from './dto/login.dto';
import type { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Create a new user account with the provided details',
  })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    type: RegisterRequest,
  })
  @ApiBadRequestResponse({ description: 'Invalid registration details.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate a user and return access tokens',
  })
  @ApiCreatedResponse({
    description: 'User logged in successfully.',
    type: LoginRequest,
  })
  @ApiBadRequestResponse({ description: 'Invalid login details.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }
}
