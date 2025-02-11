import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
  ValidationPipeOptions,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  constructor(private validatorOptions?: ValidationPipeOptions) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const object = plainToInstance(metatype, value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const errors = await validate(object);
    if (errors.length > 0) {
      // Customize output
      throw new BadRequestException({
        data: errors.map((error) => {
          delete error.target;
          return {
            [error.property]: error,
          };
        }),
        message: 'Validation error',
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        success: false,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
