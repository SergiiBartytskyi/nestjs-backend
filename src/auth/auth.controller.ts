import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import { AuthResponse } from './dto/auth.dto';
import { AuthLoginResponse } from './dto/auth-login-response.dto';

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
    type: AuthResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid registration details.' })
  @ApiConflictResponse({ description: 'User with this email already exists.' })
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
  @ApiOkResponse({
    description: 'User logged in successfully.',
    type: AuthLoginResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid login details.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Refresh tokens',
    description: 'Refresh access and refresh tokens using the refresh token',
  })
  @ApiOkResponse({
    description: 'Tokens refreshed successfully.',
    type: AuthLoginResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized access.' })
  @ApiBadRequestResponse({ description: 'Invalid refresh token.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'User logout',
    description: 'Logout the user by clearing the refresh token cookie',
  })
  @ApiNoContentResponse({ description: 'User logged out successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }
}
