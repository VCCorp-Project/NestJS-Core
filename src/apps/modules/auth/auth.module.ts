import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTModule } from 'src/core/modules/jwt/jwt.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/apps/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User]), JWTModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
