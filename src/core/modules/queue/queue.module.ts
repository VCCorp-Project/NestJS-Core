import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('queue.redis.host'),
          port: configService.get('queue.redis.port'),
          db: configService.get('queue.redis.db'),
        },
      }),
      inject: [ConfigService],
    }),
  ],

  exports: [BullModule],
})
export class QueueModule {}
