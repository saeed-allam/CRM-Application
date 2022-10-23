import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any, defaultFilter?: boolean): any {
        const key = Object.keys(filter);
        let allFilterValueNull = true;
        for (let i = 0; i < key.length; i++) {
            if (filter[key[i]] != null) {
                allFilterValueNull = false;
                break;
            }
        }
        if (!filter || allFilterValueNull) {
            return items;
        }

        if (!Array.isArray(items)) {
            return items;
        }

        if (filter && Array.isArray(items)) {
            const filterKeys = Object.keys(filter);
            if (defaultFilter) {
                return items.filter(item =>
                    filterKeys.reduce(
                        (x, keyName) =>
                            (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == '',
                        true
                    )
                );
            } else {
                return items.filter(item => {
                    return filterKeys.some(keyName => {
                        return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == '';
                    });
                });
            }
        }
    }
}
