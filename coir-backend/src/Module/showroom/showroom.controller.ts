import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ShowroomService } from './showroom.service';

@Controller('showroom')
export class ShowroomController {
  constructor(private readonly showroomService: ShowroomService) {}

  // --- INVENTORY ---
  @Get('inventory')
  async getInventory() {
    return this.showroomService.getInventory();
  }

  @Post('inventory')
  async createInventoryItem(@Body() body: any) {
    return this.showroomService.createInventoryItem(body);
  }

  @Put('inventory/:id')
  async updateInventoryItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    return this.showroomService.updateInventoryItem(id, body);
  }

  @Delete('inventory/:id')
  async deleteInventoryItem(@Param('id', ParseIntPipe) id: number) {
    return this.showroomService.deleteInventoryItem(id);
  }

  // --- SUPPLIERS ---
  @Get('suppliers')
  async getSuppliers() {
    return this.showroomService.getSuppliers();
  }

  @Post('suppliers')
  async createSupplier(@Body() body: any) {
    return this.showroomService.createSupplier(body);
  }

  @Delete('suppliers/:id')
  async deleteSupplier(@Param('id') id: string) {
    return this.showroomService.deleteSupplier(id);
  }

  // --- DEMANDS & ORDERS ---
  @Get('demands')
  async getDemands() {
    return this.showroomService.getDemands();
  }

  @Post('demands')
  async createDemand(@Body() body: any) {
    return this.showroomService.createDemand(body);
  }

  @Post('demands/:id/order')
  async placeOrder(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.showroomService.placeOrder(id, body);
  }
}
