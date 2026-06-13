import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import type {
  AuthenticatedRequest,
} from '../auth/guards/jwt-auth.guard';

import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createDraft(
    @Req() req: AuthenticatedRequest,
    @Body()
    body: {
      schemeId: number;
      courseId: number;
    },
  ) {
    return this.applicationService.createDraft(
      req.user.userId,
      body.schemeId,
      body.courseId,
    );
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async myApplications(
    @Req() req: AuthenticatedRequest,
  ) {
    return this.applicationService.findByUser(
      req.user.userId,
    );
  }

  @Post(':id/details')
  @UseGuards(JwtAuthGuard)
  async saveDetails(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.applicationService.saveApplicationDetails(
      Number(id),
      body,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
  ) {
    return this.applicationService.findOne(
      Number(id),
    );
  }

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard)
  async submitApplication(
    @Param('id') id: string,
  ) {
     return this.applicationService.submit(
      Number(id),
    );
  }


}