import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import databaseConfig from '../../config/database.config';
import jwtConfig from 'src/core/config/jwt.config';
import encryptionConfig from '../../config/encryption.config';
import cacheConfig from '../../config/cache.config';
import queueConfig from '../../config/queue.config';
import mailConfig from '../../config/mail.config';
import storageConfig from '../../config/storage.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Run as global
      load: [
        databaseConfig,
        jwtConfig,
        encryptionConfig,
        cacheConfig,
        queueConfig,
        mailConfig,
        storageConfig,
      ], // Load databaseConfig, jwtConfig, hashingConfig, ... files here
    }),
  ],
  exports: [ConfigModule], //Exports ConfigModule to other modules to use, especially ConfigService
})
export class ConfigurationModule {}
