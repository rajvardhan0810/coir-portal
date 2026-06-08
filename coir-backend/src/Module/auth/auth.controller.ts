import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SendOtpDto } from './dto/send-otp.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { AuthenticatedRequest } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterUserDto,
  ) {
    return this.authService.register(dto);
  }

  @Get('captcha')
  createCaptcha() {
    return this.authService.createCaptcha();
  }

  @Post('send-otp')
  async sendOtp(
    @Body() dto: SendOtpDto,
  ) {
    return this.authService.sendOtp(dto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginUserDto,
  ) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  async refresh(
    @Body()
    body: { refreshToken: string },
  ) {
    return this.authService.refreshTokens(
      body.refreshToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req()
    request: AuthenticatedRequest,
  ) {
    return this.authService.logout(
      request.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(
    @Req()
    request: AuthenticatedRequest,
  ) {
    return this.authService.getProfile(
      request.user.userId,
    );
  }
}