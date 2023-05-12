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
    let found_array: any = [];
    let not_found_array: any = [];
    items.forEach((singleItem, i) => {
        for(let ff of iArray) {
          if(singleItem[ff]) {
            try{
              if(singleItem[ff].toString().toLowerCase().includes(value.toLowerCase())) {
                //return true;
                found_array.push(singleItem); return;
              }
            }
            catch(e){
              if(singleItem[ff].toString().includes(value)) {
                //return true;
                found_array.push(singleItem); return;
              }
            }
          }
        }
        //return false;
        not_found_array.push(singleItem);
      }
    );

    return [...found_array, ...not_found_array]

  }
}
