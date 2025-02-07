import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantModule } from './apps/modules/participant/participant.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
