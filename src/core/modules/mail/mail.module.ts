import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import * as process from 'node:process';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const username = configService.get<string>('mail.username');
        const password = configService.get<string>('mail.password');
        const host = configService.get<string>('mail.host');
        return {
          transport: {
            host,
            auth: {
              user: username,
              pass: password,
            },
            ignoreTLS: true,
            secure: false,
          },
          defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
          },
          template: {
            // Path to template file
            dir: path.join(process.env.PWD || '', 'src/apps/mails'),
            // HTML Engine
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
