import { Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService {
  constructor(private readonly sequelize: Sequelize) {}

  async query(sql: string): Promise<object[]> {
    const results = await this.sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });
    return results;
  }
}
