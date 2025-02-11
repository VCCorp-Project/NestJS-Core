import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { EventParticipant } from './event-participant.model';
import { Participant } from './participant.model';

@Table({
  tableName: 'events',
})
export class Event extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'event_id' })
  eventId: number;

  @Column({ field: 'event_name' })
  eventName: string;

  @Column({ field: 'start_date' })
  startDate: Date;

  @Column({ field: 'end_date' })
  endDate: Date;

  @Column({ field: 'cover_image' })
  coverImage: string;

  @Default('local')
  @Column({ field: 'cover_image_disk_storage' })
  coverImageDiskStorage: string;

  @BelongsToMany(() => Participant, () => EventParticipant)
  participants: Participant[];

  createdAt?: any;
  updatedAt?: any;
}
