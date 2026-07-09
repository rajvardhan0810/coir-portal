import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('demands')
  async getDemands() {
    return this.businessService.getDemands();
  }

  @Post('demands/:id/response')
  async submitResponse(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.businessService.submitResponse(id, body);
  }
}
