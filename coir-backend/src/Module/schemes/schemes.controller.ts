import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { SchemesService } from './schemes.service';

@Controller('schemes')
export class SchemesController {
  constructor(
    private readonly schemesService: SchemesService,
  ) {}

  @Get()
  async findAll() {
    return this.schemesService.findAll();
  }

  @Get(':schemeId/courses')
  async findCoursesBySchemeId(
    @Param('schemeId', ParseIntPipe)
    schemeId: number,
  ) {
    return this.schemesService.findCoursesBySchemeId(
      schemeId,
    );
  }
}