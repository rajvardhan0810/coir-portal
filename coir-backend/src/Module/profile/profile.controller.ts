import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  JwtAuthGuard,
  
} from '../auth/guards/jwt-auth.guard';

import type {
  AuthenticatedRequest,
} from '../auth/guards/jwt-auth.guard';

import { ProfileService } from './profile.service';

import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.profileService.getProfile(
      req.user.userId,
    );
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req: AuthenticatedRequest,

    @Body()
    dto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(
      req.user.userId,
      dto,
    );
  }
}