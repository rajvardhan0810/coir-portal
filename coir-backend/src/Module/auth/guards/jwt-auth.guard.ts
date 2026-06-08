import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    mobile: string;
    userType: string;
  };
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}