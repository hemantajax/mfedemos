import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncates a string to a specified length and adds ellipsis
 * Usage: {{ text | truncate:50 }}
 */
@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, ellipsis = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + ellipsis;
  }
}
