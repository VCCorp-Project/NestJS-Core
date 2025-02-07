import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Participant } from 'src/apps/models/participant.model';

@Module({
  imports: [SequelizeModule.forFeature([Participant])],
  providers: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
