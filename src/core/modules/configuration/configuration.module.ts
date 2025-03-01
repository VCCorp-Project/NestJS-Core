import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import databaseConfig from '../../config/database.config';
import fileStorageConfig from 'src/apps/config/file-storage.config';
import jwtConfig from 'src/core/config/jwt.config';
import encryptionConfig from '../../config/encryption.config';
import cacheConfig from '../../config/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Run as global
      load: [
        databaseConfig,
        fileStorageConfig,
        jwtConfig,
        encryptionConfig,
        cacheConfig,
      ], // Load databaseConfig, jwtConfig, hashingConfig, ... files here
    }),
  ],
  exports: [ConfigModule], //Exports ConfigModule to other modules to use, especially ConfigService
})
export class ConfigurationModule {}
