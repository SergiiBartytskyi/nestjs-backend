import {
  type ArgumentMetadata,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): string {
    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }

    return String(value);
  }
}
