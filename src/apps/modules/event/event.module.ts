import { Event } from 'src/apps/models/event.model';
import { EventController } from './event.controller';
import { EventParticipant } from 'src/apps/models/event-participant.model';
import { EventService } from './event.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([Event, EventParticipant]),
    MulterModule.register({ dest: 'uploads' }),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
