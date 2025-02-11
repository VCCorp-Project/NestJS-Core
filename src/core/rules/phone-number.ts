import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@ValidatorConstraint()
@Injectable()
export class MustBeValidPhoneNumber implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return value[0] == '0';
  }

  defaultMessage(): string {
    return `Field must be valid phone number`;
  }
}

export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    registerDecorator({
      name: 'is-valid-phone-number',
      target: object.constructor,
      propertyName: propertyName,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      options: validationOptions,
      validator: MustBeValidPhoneNumber,
    });
  };
}
