import { Module } from '@nestjs/common';
import { ShowroomController } from './showroom.controller';
import { ShowroomService } from './showroom.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShowroomController],
  providers: [ShowroomService],
  exports: [ShowroomService],
})
export class ShowroomModule {}
