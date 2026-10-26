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
    const supplierName = data.supplierName || "Supplier Partner";

    // Ensure supplier exists in DB
    const existingSup = await this.prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!existingSup) {
      await this.prisma.supplier.create({
        data: {
          id: supplierId,
          name: supplierName,
          rating: 4.5,
          stars: 5,
          availability: "IN STOCK",
          stock: 1000,
          fulfillment: "14 Days",
          base: parseFloat(data.basePrice) || 150,
          trans: parseFloat(data.transportationPrice) || 15,
          tax: parseFloat(data.taxPrice) || 20,
          total: (parseFloat(data.basePrice) || 150) + (parseFloat(data.transportationPrice) || 15) + (parseFloat(data.taxPrice) || 20),
        },
      });
    }

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
