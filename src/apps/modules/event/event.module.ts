import { Event } from 'src/apps/models/event.model';
import { EventController } from './event.controller';
import { EventParticipant } from 'src/apps/models/event-participant.model';
import { EventService } from './event.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Event, EventParticipant])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
