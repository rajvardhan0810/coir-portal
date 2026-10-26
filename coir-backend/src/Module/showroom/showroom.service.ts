import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ShowroomService {
  constructor(private readonly prisma: PrismaService) {}

  // --- INVENTORY ---
  async getInventory() {
    return this.prisma.inventoryItem.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async createInventoryItem(data: any) {
    return this.prisma.inventoryItem.create({
      data: {
        name: data.name,
        sku: data.sku,
        category: data.category,
        quantity: parseInt(data.quantity) || 0,
        unit: data.unit,
        unitPrice: parseFloat(data.unitPrice) || 0,
        stockStatus: data.stockStatus,
        supplier: data.supplier,
        image: data.image,
      },
    });
  }

  async updateInventoryItem(id: number, data: any) {
    return this.prisma.inventoryItem.update({
      where: { id },
      data: {
        quantity: parseInt(data.quantity) || 0,
        stockStatus: data.stockStatus,
      },
    });
  }

  async deleteInventoryItem(id: number) {
    return this.prisma.inventoryItem.delete({
      where: { id },
    });
  }

  // --- SUPPLIERS ---
  async getSuppliers() {
    return this.prisma.supplier.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async createSupplier(data: any) {
    return this.prisma.supplier.create({
      data: {
        name: data.name,
        rating: parseFloat(data.rating) || 0,
        stars: Math.round(parseFloat(data.rating)) || 0,
        availability: data.availability,
        stock: parseInt(data.stock) || 0,
        fulfillment: data.fulfillment,
        base: parseFloat(data.base) || 0,
        trans: parseFloat(data.trans) || 0,
        tax: parseFloat(data.tax) || 0,
        total: (parseFloat(data.base) || 0) + (parseFloat(data.trans) || 0) + (parseFloat(data.tax) || 0),
      },
    });
  }

  async deleteSupplier(id: string) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }

  // --- DEMANDS & ORDERS ---
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

  async createDemand(data: any) {
    let demandId = data.id || `DEM-2026-${Math.floor(100 + Math.random() * 900)}`;

    const existing = await this.prisma.demand.findUnique({ where: { id: demandId } });
    if (existing) {
      demandId = `DEM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const demand = await this.prisma.demand.create({
      data: {
        id: demandId,
        category: data.category,
        productName: data.productName,
        dateText: data.dateText,
        qty: data.qty,
        status: data.status || 'SUBMITTED',
      },
    });

    return this.prisma.demand.findUnique({
      where: { id: demand.id },
      include: {
        responses: {
          include: {
            supplier: true,
          },
        },
      },
    });
  }

  async placeOrder(demandId: string, data: any) {
    await this.prisma.demand.update({
      where: { id: demandId },
      data: { status: 'ORDER PLACED' },
    });

    const order = await this.prisma.order.create({
      data: {
        demandId: demandId,
        category: data.category,
        productName: data.productName,
        orderDate: data.orderDate || '11/04/2026',
        totalQty: data.totalQty,
      },
    });

    if (data.allocations && Array.isArray(data.allocations)) {
      for (const alloc of data.allocations) {
        await this.prisma.orderAllocation.create({
          data: {
            orderId: order.id,
            supplierId: alloc.supplierId,
            supplierName: alloc.supplierName,
            rating: parseFloat(alloc.rating) || 0,
            stars: parseInt(alloc.stars) || 0,
            allocatedQty: String(alloc.allocatedQty),
            fulfillment: alloc.fulfillment,
            base: parseFloat(alloc.priceBreakup?.base) || 0,
            trans: parseFloat(alloc.priceBreakup?.trans) || 0,
            tax: parseFloat(alloc.priceBreakup?.tax) || 0,
            total: parseFloat(alloc.priceBreakup?.total) || 0,
          },
        });
      }
    }

    return this.prisma.demand.findUnique({
      where: { id: demandId },
      include: {
        orders: {
          include: {
            allocations: true,
          },
        },
      },
    });
  }
}
