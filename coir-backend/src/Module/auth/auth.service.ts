import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomInt, randomUUID } from 'crypto';

import { PrismaService } from '../../prisma/prisma.service';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SendOtpDto } from './dto/send-otp.dto';

type CaptchaRecord = {
  answer: string;
  expiresAt: number;
};

@Injectable()
export class AuthService {
  private readonly captchas = new Map<string, CaptchaRecord>();

  private readonly captchaTtlMs = 10 * 60 * 1000;
  private readonly otpTtlMs = 5 * 10 * 1000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,

  ) {}

  createCaptcha() {
    const left = randomInt(1, 10);
    const right = randomInt(1, 10);

    const captchaId = randomUUID();

    this.captchas.set(captchaId, {
      answer: String(left + right),
      expiresAt: Date.now() + this.captchaTtlMs,
    });

    return {
      captchaId,
      question: `${left} + ${right} = ?`,
      expiresInSeconds: this.captchaTtlMs / 1000,
      devCaptchaCode: String(left + right),
    };
  }

  async register(dto: RegisterUserDto) {
    const mobile = this.getMobile(dto);
    // const password = dto.password ?? randomUUID();
    // const userType = dto.userType ?? 'INDIVIDUAL';
    const userType  = 'INDIVIDUAL';

    const existingUser =
      await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              mobile,
            },
            ...(dto.email
              ? [
                  {
                    email:
                      dto.email.toLowerCase(),
                  },
                ]
              : []),
          ],
        },
      });

    if (existingUser) {
      throw new ConflictException(
        'User already exists',
      );
    }

    // const hashedPassword =
    //   await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        mobile,
        email: dto.email?.toLowerCase(),
        // password: hashedPassword,
        userType,

        profile: {
          create: {
            fullName: dto.fullName,
            dob: dto.dateOfBirth
              ? new Date(dto.dateOfBirth)
              : undefined,
            gender: dto.gender,
            address: dto.addressLine,
            city: dto.city,
            district: dto.district,
            state: dto.state,
            country: dto.country,
            postalCode: dto.pincode,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return {
      message:
        'User registered successfully, please login',
      user: this.toPublicUser(user),
    };
  }

  async login(dto: LoginUserDto) {
  this.validateCaptcha(
    dto.captchaId,
    this.getCaptchaCode(dto),
  );

  const mobile = this.getMobile(dto);

  const user =
    await this.prisma.user.findUnique({
      where: {
        mobile,
      },
    });

  if (!user) {
    throw new UnauthorizedException(
      'User not found',
    );
  }

  if (
    !user.otpHash ||
    !user.otpExpiresAt
  ) {
    throw new UnauthorizedException(
      'OTP not generated',
    );
  }

  if (
    user.otpExpiresAt.getTime() <
    Date.now()
  ) {
    throw new UnauthorizedException(
      'OTP expired',
    );
  }

  const otpValid =
    await bcrypt.compare(
      dto.otp,
      user.otpHash,
    );

  if (!otpValid) {
    throw new UnauthorizedException(
      'Invalid OTP',
    );
  }

  const tokens =
    await this.generateTokens(
      user.id,
      user.mobile,
      user.userType,
    );

  const refreshTokenHash =
    await bcrypt.hash(
      tokens.refreshToken,
      10,
    );

  await this.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      refreshTokenHash,
      otpHash: null,
      otpExpiresAt: null,
    },
  });

  return {
    message: 'Login successful',
    ...tokens,
    user: this.toPublicUser(user),
  };
  }


  async sendOtp(dto: SendOtpDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      mobile: dto.mobile,
    },
  });

  if (!user) {
    throw new NotFoundException(
      'Mobile number is not registered',
    );
  }

  const otp = String(
    randomInt(100000, 1000000),
  );

  const otpHash = await bcrypt.hash(
    otp,
    10,
  );

  await this.prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      otpHash,
      otpExpiresAt: new Date(
        Date.now() + this.otpTtlMs,
      ),
    },
  });

  return {
    message: 'OTP sent successfully',
    expiresInSeconds:
      this.otpTtlMs / 1000,

    // development only
    devOtp: otp,
  };
  }

  async refreshTokens(
    refreshToken: string,
  ) {
    try {
      const payload =
        await this.jwtService.verifyAsync(
          refreshToken,
          {
            secret:
              process.env
                .JWT_REFRESH_SECRET,
          },
        );

      const user =
        await this.prisma.user.findUnique({
          where: {
            id: payload.sub,
          },
        });

      if (
        !user ||
        !user.refreshTokenHash
      ) {
        throw new UnauthorizedException();
      }

      const valid =
        await bcrypt.compare(
          refreshToken,
          user.refreshTokenHash,
        );

      if (!valid) {
        throw new UnauthorizedException();
      }

      const tokens =
        await this.generateTokens(
          user.id,
          user.mobile,
          user.userType,
        );

      const refreshTokenHash =
        await bcrypt.hash(
          tokens.refreshToken,
          10,
        );

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshTokenHash,
        },
      });

      return tokens;
    } catch {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }
  }

  async logout(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });

    return {
      message: 'Logged out successfully',
    };
  }

  async getProfile(userId: number) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          profile: true,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return this.toPublicUser(user);
  }

  private validateCaptcha(
    captchaId: string,
    captchaCode: string,
  ) {
    const captcha =
      this.captchas.get(captchaId);

    if (!captcha) {
      throw new BadRequestException(
        'Invalid captcha',
      );
    }

    if (captcha.expiresAt < Date.now()) {
      throw new BadRequestException(
        'Captcha expired',
      );
    }

    if (
      captcha.answer !==
      captchaCode.trim()
    ) {
      throw new BadRequestException(
        'Invalid captcha',
      );
    }

    this.captchas.delete(captchaId);
  }

  private getMobile(dto: {
    mobile?: string;
    mobileNumber?: string;
  }) {
    const mobile =
      dto.mobile ?? dto.mobileNumber;

    if (!mobile) {
      throw new BadRequestException(
        'Mobile number is required',
      );
    }

    return mobile.replace(/\s+/g, '').trim();
  }

  private getCaptchaCode(dto: {
    captchaCode?: string;
    captchaAnswer?: string;
  }) {
    const captchaCode =
      dto.captchaCode ?? dto.captchaAnswer;

    if (!captchaCode) {
      throw new BadRequestException(
        'Captcha is required',
      );
    }

    return captchaCode;
  }

  private toPublicUser(user: {
    id: number;
    mobile: string;
    email: string | null;
    userType: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    profile?: {
      fullName: string;
      dob: Date | null;
      gender: string | null;
      address: string | null;
      city: string | null;
      district: string | null;
      state: string | null;
      country: string | null;
      postalCode: string | null;
    } | null;
  }) {
    return {
      id: user.id,
      mobile: user.mobile,
      mobileNumber: user.mobile,
      email: user.email,
      userType: user.userType,
      isActive: user.isActive,
      fullName: user.profile?.fullName ?? null,
      dateOfBirth: user.profile?.dob ?? null,
      gender: user.profile?.gender ?? null,
      addressLine: user.profile?.address ?? null,
      city: user.profile?.city ?? null,
      district: user.profile?.district ?? null,
      state: user.profile?.state ?? null,
      country: user.profile?.country ?? null,
      pincode: user.profile?.postalCode ?? null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private async generateTokens(
    userId: number,
    mobile: string,
    userType: string,
  ) {
    const accessToken =
      await this.jwtService.signAsync(
        {
          sub: userId,
          mobile,
          userType,
        },
        {
          secret:
            process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

    const refreshToken =
      await this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret:
            process.env
              .JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      );

    return {
      accessToken,
      refreshToken,
    };
  }
}
