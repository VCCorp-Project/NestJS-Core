import { Module } from '@nestjs/common';
import { Participant } from 'src/apps/models/participant.model';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BullModule } from '@nestjs/bullmq';
import { EmailProcessor } from '../../queues/processors/email.processor';
import { Event } from '../../models/event.model';
import { MailModule } from '../../../core/modules/mail/mail.module';
import { QueueModule } from '../../../core/modules/queue/queue.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Participant, Event]),
    QueueModule,
    //register queue
    BullModule.registerQueue({
      name: 'email-queue',
    }),
    MailModule,
  ],
  providers: [ParticipantService, EmailProcessor],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
