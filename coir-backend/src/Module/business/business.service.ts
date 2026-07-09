import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async getDemands() {
    return this.prisma.demand.findMany({
      include: {
        responses: {
          include: {
            supplier: true,
          },
        },
        orders: {
          include: {
            allocations: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async submitResponse(demandId: string, data: any) {
    const supplierId = data.supplierId || "sup-2";

    // Update demand status to RESPONDED
    await this.prisma.demand.update({
      where: { id: demandId },
      data: { status: 'RESPONDED' },
    });

    const base = parseFloat(data.basePrice) || 0;
    const trans = parseFloat(data.transportationPrice) || 0;
    const tax = parseFloat(data.taxPrice) || 0;

    return this.prisma.supplierResponse.upsert({
      where: {
        demandId_supplierId: {
          demandId: demandId,
          supplierId: supplierId,
        },
      },
      update: {
        base,
        trans,
        tax,
        total: base + trans + tax,
      },
      create: {
        demandId: demandId,
        supplierId: supplierId,
        base,
        trans,
        tax,
        total: base + trans + tax,
      },
    });
  }
}
