import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './apps/modules/auth/auth.module';
import { CoreModule } from './core/core.module';
import { EventModule } from './apps/modules/event/event.module';
import { Module } from '@nestjs/common';
import { ParticipantModule } from './apps/modules/participant/participant.module';

@Module({
  imports: [CoreModule, ParticipantModule, EventModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
