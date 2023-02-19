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
            try{
              if(singleItem[ff].toString().toLowerCase().includes(value.toLowerCase())) {
                return true;
              }
            }
            catch(e){
              if(singleItem[ff].toString().includes(value)) {
                return true;
              }
            }
          }
        }
        return false;
      }
    );
  }
}
