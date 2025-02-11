import { Module } from '@nestjs/common';
import { Participant } from 'src/apps/models/participant.model';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Participant])],
  providers: [ParticipantService],
  controllers: [ParticipantController],
})
export class ParticipantModule {}
