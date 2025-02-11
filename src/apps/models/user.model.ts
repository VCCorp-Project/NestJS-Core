import * as bcrypt from 'bcrypt';

import {
  AutoIncrement,
  BeforeCreate,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { Exclude } from 'class-transformer';
import jwtConfig from 'src/core/config/jwt.config';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'id' })
  id: number;

  @Column({ field: 'email' })
  email: string;

  @Exclude()
  @Column({ field: 'password' })
  password: string;

  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcrypt.hash(user.password, jwtConfig().jwt.rounds);
  }
}
