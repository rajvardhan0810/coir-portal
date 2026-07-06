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
    personalDetails: any,
  ) {
    const fullName =
      this.getText(personalDetails?.fullName);
    const dob =
      this.getText(personalDetails?.dob);
    const fatherName =
      this.getText(personalDetails?.fatherName);
    const gender =
      this.getText(personalDetails?.gender);
    const caste =
      this.getText(personalDetails?.caste);
    const mobile =
      this.getText(personalDetails?.mobile);
    const email =
      this.getText(personalDetails?.email);
    const address =
      this.getText(personalDetails?.address);
    const city =
      this.getText(personalDetails?.city);
    const state =
      this.getText(personalDetails?.state);
    const pincode =
      this.getText(personalDetails?.pincode);
    const country =
      this.getText(personalDetails?.country);

    if (!fullName) {
      throw new BadRequestException(
        'Full name is required',
      );
    }

    if (!dob) {
      throw new BadRequestException(
        'Date of birth is required',
      );
    }

    if (!fatherName) {
      throw new BadRequestException(
        'Father / husband name is required',
      );
    }

    if (!gender) {
      throw new BadRequestException(
        'Gender is required',
      );
    }

    if (!caste) {
      throw new BadRequestException(
        'Caste is required',
      );
    }

    if (!this.mobilePattern.test(mobile)) {
      throw new BadRequestException(
        'Invalid mobile number',
      );
    }

    if (!this.emailPattern.test(email)) {
      throw new BadRequestException(
        'Invalid email address',
      );
    }

    if (!address) {
      throw new BadRequestException(
        'Address is required',
      );
    }

    if (!city) {
      throw new BadRequestException(
        'City is required',
      );
    }

    if (!state) {
      throw new BadRequestException(
        'State is required',
      );
    }

    if (!this.pincodePattern.test(pincode)) {
      throw new BadRequestException(
        'Invalid pincode',
      );
    }

    if (!country) {
      throw new BadRequestException(
        'Country is required',
      );
    }
  }

  private assertValidBankDetails(
    bankDetails: any,
  ) {
    const aadhaarNumber =
      this.getText(bankDetails?.aadhaarNumber);
    const panNumber =
      this.getText(bankDetails?.panNumber).toUpperCase();
    const tenthMarks =
      Number(this.getText(bankDetails?.tenthMarks));
    const twelfthMarks =
      Number(this.getText(bankDetails?.twelfthMarks));
    const bankName =
      this.getText(bankDetails?.bankName);
    const accountHolderName =
      this.getText(bankDetails?.accountHolderName);
    const accountNumber =
      this.getText(bankDetails?.accountNumber);
    const ifscCode =
      this.getText(bankDetails?.ifscCode).toUpperCase();

    if (!this.isValidAadhaarNumber(aadhaarNumber)) {
      throw new BadRequestException(
        'Invalid Aadhaar number',
      );
    }

    if (!this.panPattern.test(panNumber)) {
      throw new BadRequestException(
        'Invalid PAN number',
      );
    }

    if (
      Number.isNaN(tenthMarks) ||
      tenthMarks < 0 ||
      tenthMarks > 100
    ) {
      throw new BadRequestException(
        'Valid 10th marks are required',
      );
    }

    if (
      Number.isNaN(twelfthMarks) ||
      twelfthMarks < 0 ||
      twelfthMarks > 100
    ) {
      throw new BadRequestException(
        'Valid 12th marks are required',
      );
    }

    if (!bankName) {
      throw new BadRequestException(
        'Bank name is required',
      );
    }

    if (!accountHolderName) {
      throw new BadRequestException(
        'Account holder name is required',
      );
    }

    if (!this.accountNumberPattern.test(accountNumber)) {
      throw new BadRequestException(
        'Invalid account number',
      );
    }

    if (!this.ifscPattern.test(ifscCode)) {
      throw new BadRequestException(
        'Invalid IFSC code',
      );
    }
  }

  private assertValidExperienceDetails(
    experienceDetails: any,
  ) {
    const employerName =
      this.getText(experienceDetails?.employerName);
    const natureOfWork =
      this.getText(experienceDetails?.natureOfWork);
    const dateOfJoining =
      this.getText(experienceDetails?.dateOfJoining);
    const totalExperienceValue =
      this.getText(experienceDetails?.totalExperience);
    const totalExperience =
      Number(totalExperienceValue);

    if (!employerName) {
      throw new BadRequestException(
        'Employer name is required',
      );
    }

    if (!natureOfWork) {
      throw new BadRequestException(
        'Nature of work is required',
      );
    }

    if (!dateOfJoining) {
      throw new BadRequestException(
        'Date of joining is required',
      );
    }

    if (
      !totalExperienceValue ||
      Number.isNaN(totalExperience) ||
      totalExperience < 0
    ) {
      throw new BadRequestException(
        'Valid total experience is required',
      );
    }
  }

  private assertValidStepOneDocuments(
    documents: any,
  ) {
    const requiredDocuments = [
      ['photo', 'Photo is required'],
      ['aadhaar', 'Aadhaar document is required'],
      ['pan', 'PAN document is required'],
      ['tenthMarksheet', '10th marksheet is required'],
      ['twelfthMarksheet', '12th marksheet is required'],
      ['graduationCertificate', 'Graduation marksheet is required'],
      ['casteCertificate', 'Caste certificate is required'],
    ];

    for (const [field, message] of requiredDocuments) {
      if (!this.getText(documents?.[field])) {
        throw new BadRequestException(message);
      }
    }
  }

  private assertValidStepTwoDocuments(
    documents: any,
  ) {
    if (!this.getText(documents?.cancelCheque)) {
      throw new BadRequestException(
        'Cancel cheque is required',
      );
    }

    if (!this.getText(documents?.experienceLetter)) {
      throw new BadRequestException(
        'Experience letter is required',
      );
    }
  }

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

    if (!data.trainingCentreId) {
      throw new BadRequestException(
        'Training centre is required',
      );
    }
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

    if (!application.trainingCentreId) {
      throw new BadRequestException(
        'Training centre is required',
      );
    }

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
