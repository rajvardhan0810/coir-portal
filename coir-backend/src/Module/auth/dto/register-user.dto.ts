import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export enum UserType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
}

const trimValue = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const normalizeMobile = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.replace(/\s+/g, '').trim() : value;

const optionalTrimmedValue = ({ value }: { value: unknown }) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
};

export class RegisterUserDto {
  @Transform(trimValue)
  @IsString()
  @MaxLength(80)
  fullName: string;

  @ValidateIf((dto: RegisterUserDto) => !dto.mobileNumber)
  @Transform(normalizeMobile)
  @IsMobilePhone('en-IN')
  mobile?: string;

  @ValidateIf((dto: RegisterUserDto) => !dto.mobile)
  @Transform(normalizeMobile)
  @IsMobilePhone('en-IN')
  mobileNumber?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsEmail()
  email?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password?: string;

  // @IsOptional()
  // @IsEnum(UserType)
  // userType?: UserType;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsString()
  @MaxLength(160)
  addressLine?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  city?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  district?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  state?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @IsString()
  @MaxLength(60)
  country?: string;

  @Transform(optionalTrimmedValue)
  @IsOptional()
  @Matches(/^\d{6}$/)
  pincode?: string;
}
