import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Event } from './event.model';
import { Participant } from './participant.model';

@Table({
  tableName: 'event_participant',
  timestamps: false,
})
export class EventParticipant extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'id' })
  id: number;

  @ForeignKey(() => Event)
  @Column({ field: 'event_id' })
  eventId: number;

  @ForeignKey(() => Participant)
  @Column({ field: 'participant_id' })
  participantId: number;
}
