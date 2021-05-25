import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string): any[] {
 
    return items ? items.filter(item => item.name.search(new RegExp(field, 'i')) > -1) : [];

  }
}
