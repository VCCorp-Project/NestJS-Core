import { JWTService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';

// Global module
@Global()
@Module({
  exports: [JWTService],
  providers: [JWTService, JwtService],
})
export class JWTModule {}
