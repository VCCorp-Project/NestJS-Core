import { Global, Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ConfigurationModule } from '../configuration/configuration.module';
import { DatabaseService } from './database.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'mysql',
          host: configService.get<string>('database.mysql.host'), //Key mysql.host in database.config.ts
          port: configService.get<number>('database.mysql.port'), //Key mysql.port in database.config.ts
          username: configService.get<string>('database.mysql.username'),
          password: configService.get<string>('database.mysql.password'),
          database: configService.get<string>('database.mysql.db'),
          autoLoadModels: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
