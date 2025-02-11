import { DatabaseModule } from './modules/database/database.module';
import { Module } from '@nestjs/common';
import { RuleModule } from './modules/rule/rule.module';

@Module({
  imports: [DatabaseModule, RuleModule],
})
export class CoreModule {}
