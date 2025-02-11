import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from 'src/apps/models/event.model';
import { Participant } from 'src/apps/models/participant.model';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event) private event: typeof Event) {}

  async findAll(): Promise<Event[]> {
    return this.event.findAll({
      include: {
        model: Participant,
        through: {
          attributes: [],
        },
      },
    });
  }

  async store(event: Partial<Event>): Promise<Event> {
    return this.event.create(event);
  }
}
