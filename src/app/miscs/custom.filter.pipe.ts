import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'customfilter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    const iArray = field.split("|");
    return items.filter(singleItem => {
        for(let ff of iArray) {
          if(singleItem[ff]) {
            
            if(singleItem[ff].toLowerCase().includes(value.toLowerCase())) {
              return true;
            }
          }
        }
        return false;
      }
    );
  }
}
