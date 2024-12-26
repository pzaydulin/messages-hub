import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit: number = 10,
    ellipsis: string = '...'
  ): string {
    if (value.length <= limit) {
      return value;
    }

    return value.slice(0, limit) + ellipsis;
  }
}
