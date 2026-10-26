import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private readonly mobilePattern = /^[6-9]\d{9}$/;

  private readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private readonly pincodePattern = /^\d{6}$/;

  private readonly panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  private readonly ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

  private readonly accountNumberPattern = /^\d{9,18}$/;

  private getText(
    value: unknown,
  ) {
    return typeof value === 'string'
      ? value.trim()
      : '';
  }

  private isValidAadhaarNumber(
    value: string,
  ) {
    return /^[2-9]\d{11}$/.test(value);
  }

  private assertValidPersonalDetails(
    _personalDetails: any,
  ) {}

  private assertValidBankDetails(
    _bankDetails: any,
  ) {}

  private assertValidExperienceDetails(
    _experienceDetails: any,
  ) {}

  private assertValidStepOneDocuments(
    _documents: any,
  ) {}

  private assertValidStepTwoDocuments(
    _documents: any,
  ) {}

  async createDraft(
    userId: number,
    schemeId: number,
    programId: number,
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
        programId,

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

        currentStep: {
          gt: 1,
        },

      },

      include: {
        scheme: true,
        program: true,
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
  if (data.personalDetails) {
    this.assertValidPersonalDetails(
      data.personalDetails,
    );
    this.assertValidStepOneDocuments(
      data.documents,
    );
  }

  if (data.experienceDetails) {
    this.assertValidExperienceDetails(
      data.experienceDetails,
    );
  }

  if (data.bankDetails) {
    this.assertValidBankDetails(
      data.bankDetails,
    );
    this.assertValidStepTwoDocuments(
      data.documents,
    );
  }

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
        program: true,
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
    const application =
      await this.prisma.application.findUnique({
        where: {
          id: applicationId,
        },

        include: {
          detail: true,
        },
      });

    if (!application?.detail) {
      throw new BadRequestException(
        'Application details are required',
      );
    }

    this.assertValidPersonalDetails(
      application.detail.personalDetails,
    );

    this.assertValidStepOneDocuments(
      application.detail.documents,
    );

    this.assertValidExperienceDetails(
      application.detail.experienceDetails,
    );

    this.assertValidBankDetails(
      application.detail.bankDetails,
    );

    this.assertValidStepTwoDocuments(
      application.detail.documents,
    );

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

  async findAll() {
    return this.prisma.application.findMany({
      where: {
        status: {
          not: 'DRAFT',
        },
      },
      include: {
        scheme: true,
        program: true,
        trainingCentre: true,
        detail: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async bulkApprove(applicationIds: number[]) {
    await this.prisma.application.updateMany({
      where: {
        id: {
          in: applicationIds,
        },
      },
      data: {
        status: 'VERIFIED',
      },
    });

    for (const id of applicationIds) {
      await this.prisma.applicationLog.create({
        data: {
          applicationId: id,
          action: 'VERIFIED',
          remarks: 'Application bulk approved by Verifier Committee',
        },
      });
    }

    return {
      message: `${applicationIds.length} applications approved successfully`,
    };
  }

  async bulkFinalApprove(remarks?: string) {
    const verifiedApps = await this.prisma.application.findMany({
      where: {
        status: 'VERIFIED',
      },
    });

    if (verifiedApps.length === 0) {
      return {
        message: 'No verified applications found to approve',
        count: 0,
      };
    }

    const verifiedIds = verifiedApps.map((app) => app.id);

    await this.prisma.application.updateMany({
      where: {
        id: {
          in: verifiedIds,
        },
      },
      data: {
        status: 'APPROVED',
      },
    });

    for (const id of verifiedIds) {
      await this.prisma.applicationLog.create({
        data: {
          applicationId: id,
          action: 'APPROVED',
          remarks: remarks ?? 'Application approved by Verifier Committee',
        },
      });
    }

    return {
      message: `${verifiedIds.length} applications approved successfully`,
      count: verifiedIds.length,
    };
  }

  async approve(applicationId: number) {
    await this.prisma.application.update({
      where: { id: applicationId },
      data: { status: 'VERIFIED' },
    });
    await this.prisma.applicationLog.create({
      data: {
        applicationId,
        action: 'VERIFIED',
        remarks: 'Application approved by Verifier Committee',
      },
    });
    return { message: 'Application approved successfully' };
  }

  async seekClarification(applicationId: number, remarks?: string) {
    await this.prisma.application.update({
      where: { id: applicationId },
      data: { status: 'CLARIFICATION_SOUGHT' },
    });
    await this.prisma.applicationLog.create({
      data: {
        applicationId,
        action: 'CLARIFICATION_SOUGHT',
        remarks: remarks ?? 'Clarification sought by Verifier Committee',
      },
    });
    return { message: 'Clarification sought successfully' };
  }

  async sendToReview(applicationId: number, remarks?: string) {
    await this.prisma.application.update({
      where: { id: applicationId },
      data: { status: 'UNDER_REVIEW' },
    });
    await this.prisma.applicationLog.create({
      data: {
        applicationId,
        action: 'UNDER_REVIEW',
        remarks: remarks ?? 'Application sent back to review',
      },
    });
    return { message: 'Application sent back to review successfully' };
  }
}
