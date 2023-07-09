import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { Order, OrderType } from 'src/app/interfaces/order-type';
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-th-short',
  templateUrl: './th-short.component.html',
  styleUrls: ['./th-short.component.css'],
})
export class ThShortComponent implements OnInit {
  ngOnInit(): void {}

  @Input()
  short: OrderType;

  @Input()
  key: string;

  @Input()
  data: any;

  @Output() dataSorted = new EventEmitter<any[]>();

  orderTypes = OrderType;

  sortTable(orderType: OrderType): void {
    console.log("CLICK");
    if (orderType === OrderType.ALPHABETICAL) {
      this.data.sort((a, b) =>
        a[this.key]
          .trim()
          .normalize()
          .localeCompare(b[this.key].trim().normalize())
      );
    } else if (orderType === OrderType.NUMERIC) {
      this.data.sort((a, b) => {
        const numA = parseFloat(a[this.key]);
        const numB = parseFloat(b[this.key]);
        if (isNaN(numA) || isNaN(numB)) {
          // If the value is not a number, try parsing it as a date
          const dateA = new Date(a[this.key]);
          const dateB = new Date(b[this.key]);
          return dateA.getTime() - dateB.getTime();
        }
        return numA - numB;
      });
    }
    this.dataSorted.emit(this.data);
  }

  currentOrder: Order='asc';

  toggleOrder(order: Order): void {
    this.currentOrder = order;
    if (order == 'desc') {
      this.data = this.data;
    } else {
      this.data = this.data.reverse();
    }
    this.dataSorted.emit(this.data);
  }
  toggleOrderInv(): void {
    this.currentOrder = this.currentOrder === 'asc' ? 'desc' : 'asc';
    this.data = this.data.reverse();
    this.dataSorted.emit(this.data);
  }
  getPropertyValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, current) => acc[current], obj);
  }
}
