import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SchemesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.scheme.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findProgramsBySchemeId(
    schemeId: number,
  ) {
    return this.prisma.program.findMany({
      where: {
        schemeId,
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
}