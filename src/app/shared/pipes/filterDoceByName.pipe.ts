// filter.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { Doce } from '../models/doce.model';

@Pipe({ name: 'appFilter' })
export class FilterPipeDoceByName implements PipeTransform {
  /**
   * Transform
   *

   */
  transform(items: Doce[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.nome.toLocaleLowerCase().includes(searchText);
    });
  }
}