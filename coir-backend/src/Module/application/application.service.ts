import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createDraft(
    userId: number,
    schemeId: number,
    courseId: number,
  ) {
    const count =
      await this.prisma.application.count();

    const applicationNo = `APP-${new Date().getFullYear()}-${String(
      count + 1,
    ).padStart(3, '0')}`;

    return this.prisma.application.create({
      data: {
        applicationNo,
        userId,
        schemeId,
        courseId,

        // NEW
        currentStep: 1,

        status: 'DRAFT',
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.application.findMany({
      where: {
        userId,
      },

      include: {
        scheme: true,
        course: true,
        trainingCentre: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

 async saveApplicationDetails(
  applicationId: number,
  data: {
    personalDetails?: any;
    experienceDetails?: any;
    bankDetails?: any;
    documents?: any;
    declarationAccepted?: boolean;

    currentStep?: number;
    trainingCentreId?: number;
  },
) {
  const existingDetail =
    await this.prisma.applicationDetail.findUnique({
      where: {
        applicationId,
      },
    });

  await this.prisma.applicationDetail.upsert({
    where: {
      applicationId,
    },

    update: {
      personalDetails:
        data.personalDetails ??
        existingDetail?.personalDetails,

      experienceDetails:
        data.experienceDetails ??
        existingDetail?.experienceDetails,

      bankDetails:
        data.bankDetails ??
        existingDetail?.bankDetails,

      documents: {
        ...(existingDetail?.documents as any),
        ...(data.documents ?? {}),
      },

      declarationAccepted:
        data.declarationAccepted ??
        existingDetail?.declarationAccepted ??
        false,
    },

    create: {
      applicationId,

      personalDetails:
        data.personalDetails,

      experienceDetails:
        data.experienceDetails,

      bankDetails:
        data.bankDetails,

      documents:
        data.documents ?? {},

      declarationAccepted:
        data.declarationAccepted ??
        false,
    },
  });

  await this.prisma.application.update({
    where: {
      id: applicationId,
    },

    data: {
      currentStep:
        data.currentStep,

      trainingCentreId:
        data.trainingCentreId,
    },
  });

  return {
    message:
      'Application saved successfully',
  };
}

  async findOne(
    applicationId: number,
  ) {
    return this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },

      include: {
        scheme: true,
        course: true,
        trainingCentre: true,

        detail: true,

        logs: true,

        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async submit(
    applicationId: number,
  ) {
    await this.prisma.application.update({
      where: {
        id: applicationId,
      },

      data: {
        status: 'SUBMITTED',

        currentStep: 4,

        submittedAt:
          new Date(),
      },
    });

    await this.prisma.applicationLog.create({
      data: {
        applicationId,

        action: 'SUBMITTED',

        remarks:
          'Application submitted successfully',
      },
    });

    return {
      message:
        'Application submitted successfully',
    };
  }
}