import { DatabaseModule } from './modules/database/database.module';
import { Module } from '@nestjs/common';
import { RuleModule } from './modules/rule/rule.module';
import { JWTModule } from './modules/jwt/jwt.module';

@Module({
  imports: [DatabaseModule, RuleModule, JWTModule],
})
export class CoreModule {}
