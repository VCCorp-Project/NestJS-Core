import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { MustBeUniqueConstraint } from 'src/core/rules/unique';

@Module({
  imports: [DatabaseModule],
  providers: [MustBeUniqueConstraint],
  exports: [],
})
export class RuleModule {}
