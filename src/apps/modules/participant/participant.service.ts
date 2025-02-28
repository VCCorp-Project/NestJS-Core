import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from 'src/apps/models/participant.model';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant) private participant: typeof Participant,
  ) {}

  async findAll(): Promise<Participant[]> {
    return await this.participant.findAll<Participant>();
  }

  async findByPk(id: number): Promise<Participant> {
    const participant = await this.participant.findByPk<Participant>(id);
    if (participant == null) {
      throw new NotFoundException(`Participant with id ${id} not found`);
    }
    return participant;
  }

  async deleteByPk(id: number): Promise<void> {
    const participant = await this.findByPk(id);
    return await participant.destroy();
  }

  async store(participant: Partial<Participant>): Promise<Participant> {
    return await this.participant.create<Participant>(participant);
  }

  async update(
    id: number,
    participantData: Partial<Participant>,
  ): Promise<Participant | null> {
    const participant = await this.participant.findByPk(id);
    if (!participant) {
      return null;
    }
    return await participant.update(participantData);
  }
}
