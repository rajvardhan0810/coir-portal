import { IsEnum, IsMobilePhone, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserType } from './register-user.dto';

const normalizeMobile = ({ value }: { value: unknown }) =>
  typeof value === 'string'
    ? value.replace(/\s+/g, '').trim()
    : value;

export class SendOtpDto {
  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;

  @Transform(normalizeMobile)
  @IsMobilePhone('en-IN')
  mobile: string;
}
