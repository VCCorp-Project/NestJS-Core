import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Run as global
      load: [databaseConfig], // Load databaseConfig, jwtConfig, hashingConfig, ... files here
    }),
  ],
  exports: [ConfigModule], //Exports ConfigModule to other modules to use, especially ConfigService
})
export class ConfigurationModule {}
