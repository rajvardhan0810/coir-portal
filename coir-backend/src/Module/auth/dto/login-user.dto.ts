import {
  IsMobilePhone,
  IsOptional,
  IsString,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

const trimValue = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const normalizeMobile = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.replace(/\s+/g, '').trim() : value;

export class LoginUserDto {
  @ValidateIf((dto: LoginUserDto) => !dto.mobileNumber)
  @Transform(normalizeMobile)
  @IsMobilePhone('en-IN')
  mobile?: string;

  @ValidateIf((dto: LoginUserDto) => !dto.mobile)
  @Transform(normalizeMobile)
  @IsMobilePhone('en-IN')
  mobileNumber?: string;

  @Transform(trimValue)
  @IsString()
  @Length(6, 6)
  otp: string;

  @Transform(trimValue)
  @IsString()
  captchaId: string;

  @ValidateIf((dto: LoginUserDto) => !dto.captchaAnswer)
  @Transform(trimValue)
  @IsString()
  @Length(1, 6)
  captchaCode?: string;

  @ValidateIf((dto: LoginUserDto) => !dto.captchaCode)
  @Transform(trimValue)
  @IsString()
  @Length(1, 6)
  captchaAnswer?: string;
}
