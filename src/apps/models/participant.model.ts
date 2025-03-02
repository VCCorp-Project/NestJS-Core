import {
  AutoIncrement, BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EventParticipant } from './event-participant.model';
import { Event } from './event.model';

@Table({
  tableName: 'participants',
})
export class Participant extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'participant_id' })
  participantId: number;

  @Column({ field: 'full_name' })
  fullName: string;

  @Column({ field: 'email' })
  email: string;

  @Column({ field: 'phone_number' })
  phoneNumber: string;

  @BelongsToMany(() => Event, () => EventParticipant)
  events: Event[];
}
