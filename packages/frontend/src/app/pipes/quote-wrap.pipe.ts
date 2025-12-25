import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quoteWrap'
})
export class QuoteWrapPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return (typeof value === 'string') ? `'${value}'` : value;
  }

}
