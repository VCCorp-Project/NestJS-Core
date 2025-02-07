import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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
}
