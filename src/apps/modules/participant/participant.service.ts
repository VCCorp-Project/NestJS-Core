import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Participant } from 'src/apps/models/participant.model';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel(Participant)
    private participant: typeof Participant,
  ) {}

  async findAll(): Promise<Participant[]> {
    return await this.participant.findAll();
  }

  async findByPk(id: number): Promise<Participant | null> {
    return await this.participant.findByPk(id);
  }

  async deleteByPk(id: number): Promise<number | null> {
    const participant = await this.participant.findByPk(id);
    if (!participant) {
      return null;
    }
    return await this.participant.destroy();
  }

  async store(data: any): Promise<Participant> {
    return await this.participant.create(data);
  }

  async update(id: number, data: any): Promise<Participant | null> {
    const participant = await this.participant.findByPk(id);
    if (!participant) {
      return null;
    }
    return await participant.update(data);
  }
}
