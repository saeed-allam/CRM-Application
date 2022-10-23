import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterById' })
export class FilterByIdPipe implements PipeTransform {
    transform(list: any[], Id: any, value: any): any[] {
        if (!list || !Id || !value) {
            return list;
        } else {
            return list.filter(s => s[Id] == value);
        }
    }
}
