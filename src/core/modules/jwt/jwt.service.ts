import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JWTService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signAsync(payload: object, options?: JwtSignOptions) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      ...options,
    });
  }
}
