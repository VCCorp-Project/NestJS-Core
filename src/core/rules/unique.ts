import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { DatabaseService } from '../modules/database/database.service';
import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@ValidatorConstraint({ async: true })
@Injectable()
export class MustBeUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private databaseService: DatabaseService) {}
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const [table, property] = args.constraints;
    const results = await this.databaseService.query(
      `SELECT * FROM ${table} WHERE ${property} = '${value}'`,
    );
    return results.length == 0;
  }

  defaultMessage(): string {
    return `Field must be unique`;
  }
}

export function Unique(
  table: string,
  property: string,
  ignore?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    registerDecorator({
      name: 'unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table, property],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      options: validationOptions,
      validator: MustBeUniqueConstraint,
    });
  };
}
