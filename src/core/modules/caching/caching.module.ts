import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { ConfigurationModule } from '../configuration/configuration.module';
import KeyvRedis, { Keyv } from '@keyv/redis';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService) => {
        // Fetch configuration values from ConfigService
        const redisCacheHost = configService.get<string>('cache.redis.host');
        const redisCachePort = configService.get<number>('cache.redis.port');
        const redisCacheDb = configService.get<number>('cache.redis.db');
        const redisCacheKeyPrefix =
          configService.get<string>('cache.redis.prefix');

        const keyv = new Keyv(
          {
            store: new KeyvRedis(
              `redis://${redisCacheHost}:${redisCachePort}/${redisCacheDb}`,
            ),
          },
          { namespace: redisCacheKeyPrefix, useKeyPrefix: false },
        );
        return {
          stores: [keyv],
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class CachingModule {}
