import { Module } from '@nestjs/common';
import { MustBeUniqueConstraint } from 'src/core/rules/unique';
import { MustBeValidPhoneNumber } from 'src/core/rules/phone-number';

@Module({
  imports: [],
  providers: [MustBeUniqueConstraint, MustBeValidPhoneNumber],
  exports: [],
})
export class RuleModule {}
