import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getProfile(userId: number) {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },

      include: {
        user: true,
      },
    });
  }

  async updateProfile(
    userId: number,
    dto: UpdateProfileDto,
  ) {
    return this.prisma.profile.upsert({
      where: {
        userId,
      },

      update: {
        ...dto,

        dob: dto.dob
          ? new Date(dto.dob)
          : undefined,
      },

      create: {
        userId,

        fullName:
          dto.fullName ?? '',

        dob: dto.dob
          ? new Date(dto.dob)
          : null,

        gender: dto.gender,

        fatherName:
          dto.fatherName,

        caste: dto.caste,

        address:
          dto.address,

        city: dto.city,

        district:
          dto.district,

        state: dto.state,

        postalCode:
          dto.postalCode,

        country:
          dto.country,
      },
    });
  }
}