import { JWTService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  exports: [JWTService],
  providers: [JWTService, JwtService],
})
export class JWTModule {}
