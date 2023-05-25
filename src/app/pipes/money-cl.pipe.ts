import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'moneyClPipe'
})

export class MoneyClPipe implements PipeTransform {

    public transform(value: any) {
        if (value != null) {
            //return (value.length > 3) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : value;
            if (value.toString().length > 3) {
                return value.toString().replaceAll(",", ".");
            } else {
                return value.toString().replaceAll(".", ",");
            }
        }

    }
}