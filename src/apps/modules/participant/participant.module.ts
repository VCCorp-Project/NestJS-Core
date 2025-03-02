import { Module } from '@nestjs/common';
import { Participant } from 'src/apps/models/participant.model';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from '../../queues/processors/email.processor';
import { Event } from '../../models/event.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Participant, Event]),
    //register queue
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  providers: [ParticipantService, EmailProcessor],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
