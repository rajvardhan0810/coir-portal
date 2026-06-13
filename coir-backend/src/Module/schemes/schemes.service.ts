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

  async findCoursesBySchemeId(
    schemeId: number,
  ) {
    return this.prisma.course.findMany({
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