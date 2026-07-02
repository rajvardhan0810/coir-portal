import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrainingCentresService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.trainingCentre.findMany({
      where: {
        isActive: true,
      },

      orderBy: {
        name: 'asc',
      },
    });
  }
}