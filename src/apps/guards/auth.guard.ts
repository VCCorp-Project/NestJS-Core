import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UnauthenticatedException } from '../../core/exceptions/unauthenticated.exception';
import { Request } from 'express';
import { JWTService } from '../../core/modules/jwt/jwt.service';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // if token not found in headers
    if (!request.headers.authorization) {
      throw new UnauthenticatedException();
    }
    try {
      // Validate whether token is expired
      const token = request.headers.authorization.split(' ')[1];
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (e) {
      // if token expired
      if (e instanceof TokenExpiredError) {
        throw new UnauthenticatedException('Token expired');
      }
      // if token input is invalid string
      if (e instanceof JsonWebTokenError) {
        throw new UnauthenticatedException('Invalid signature');
      }

      return false;
    }
  }
}
