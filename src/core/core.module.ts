import { DatabaseModule } from './modules/database/database.module';
import { Module } from '@nestjs/common';
import { RuleModule } from './modules/rule/rule.module';
import { JWTModule } from './modules/jwt/jwt.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { CachingModule } from './modules/caching/caching.module';
import { QueueModule } from './modules/queue/queue.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    DatabaseModule,
    RuleModule,
    JWTModule,
    EncryptionModule,
    CachingModule,
    QueueModule,
    MailModule,
  ],
})
export class CoreModule {}
