import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { TrainingCentresController } from './training-centres.controller';
import { TrainingCentresService } from './training-centres.service';

@Module({
  imports: [PrismaModule],

  controllers: [
    TrainingCentresController,
  ],

  providers: [
    TrainingCentresService,
  ],

  exports: [
    TrainingCentresService,
  ],
})
export class TrainingCentresModule {}