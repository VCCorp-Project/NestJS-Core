import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParsePositiveNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valueParam = Number(value);
    if (metadata.type != 'param') {
      throw new BadRequestException(`Must use in param`);
    }
    if (valueParam <= 0) {
      throw new BadRequestException(`Param id must greater than 0`);
    }
    return valueParam;
  }
}
