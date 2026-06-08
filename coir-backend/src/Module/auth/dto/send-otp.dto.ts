import { IsMobilePhone } from 'class-validator';
import { Transform } from 'class-transformer';

const normalizeMobile = ({ value }: { value: unknown }) =>
  typeof value === 'string'
    ? value.replace(/\s+/g, '').trim()
    : value;

export class SendOtpDto {
  @Transform(normalizeMobile)
  @IsMobilePhone('en-IN')
  mobile: string;
}