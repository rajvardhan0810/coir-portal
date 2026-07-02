import { Controller, Get } from '@nestjs/common';

import { TrainingCentresService } from './training-centres.service';

@Controller('training-centres')
export class TrainingCentresController {
  constructor(
    private readonly trainingCentresService: TrainingCentresService,
  ) {}

  @Get()
  async findAll() {
    return this.trainingCentresService.findAll();
  }
}