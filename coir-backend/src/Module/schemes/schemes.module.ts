import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { SchemesController } from './schemes.controller';
import { SchemesService } from './schemes.service';

@Module({
  imports: [PrismaModule],
  controllers: [SchemesController],
  providers: [SchemesService],
})
export class SchemesModule {}