import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
  ValidationPipeOptions,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  constructor(private validatorOptions?: ValidationPipeOptions) {}

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype as any, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // Customize output with error 422
      throw new UnprocessableEntityException({
        errors: errors.map((error) => {
          delete error.target;
          return {
            [error.property]: error,
          };
        }),
        message: 'Validation error',
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        success: false,
      });
    }

    return object;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
