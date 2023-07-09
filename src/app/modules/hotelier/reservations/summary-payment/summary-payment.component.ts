import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Helps } from 'src/app/libs/helps';
import { Charges } from 'src/app/models/interfaces/charges';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-summary-payment',
  templateUrl: './summary-payment.component.html',
  styleUrls: ['./summary-payment.component.css']
})
export class SummaryPaymentComponent implements OnInit, OnChanges {

  constructor(private helps: Helps, private api: ApiService) { }
  ngOnChanges(changes: SimpleChanges): void {
 this.generateCharges();

    if (changes['totalPayment']?.currentValue!=changes['totalPayment']?.previousValue) {
      this.calculateSubtotal();
    }
  }
  ngOnInit(): void {



  }
  @Input()
  view: boolean = true;

  @Input()
  reservations: Reservations;


  @Input()
  totalPayment: number=0;

  @Output()
  saldoFinal = new EventEmitter<number>();

  subTotal: number = 0;
  charges: Charges[] = [];
  saldo: number = 0;


  generateCharges() {
    this.charges=[];
    console.log("generateCharges");
    this.charges.push({
      created_at: this.reservations?.created_at,
      detail: "Habitación por " + this.helps.countDays(this.reservations?.start, this.reservations?.end) + " días.",
      ammount: this.reservations?.rooms?.price * this.helps.countDays(this.reservations?.start, this.reservations?.end)
    });
    if (this.reservations?.aditional > 0 && this.reservations?.price_aditional > 0) {
      this.charges.push({ created_at: this.reservations?.created_at, detail: "Cargo por  huesped " + this.reservations?.aditional + " adicionales, precio $" + this.reservations?.price_aditional + " c/u.", ammount: this.reservations?.price_aditional * this.reservations?.aditional });
    }

    this.api.getAllCharges(this.reservations?.id).subscribe((res) => {
      let chargesApi = res.data as Charges[];
      this.pushChargesApi(chargesApi);
    },(e)=>{
      this.calculateSubtotal();
    });

  }
  pushChargesApi(chargesApi: Charges[]) {
    //cargo la información en la push
    if (chargesApi) {
      chargesApi.forEach(ch => {
        const exists = this.charges.some(charge => charge?.id == ch?.id);
        if (!exists) {
          this.charges.push({ created_at: ch?.created_at, detail: ch?.detail, ammount: ch?.ammount });
        }
      });
      this.calculateSubtotal();
    }
  }
  calculateSubtotal() {
    this.subTotal = 0;
    this.saldo = 0;
    this.charges.forEach((item) => {
      console.log("CARGOS: " + item.detail + ", ", item.ammount);
      this.subTotal = Number(this.subTotal) + Number(item.ammount);
    });
    this.saldo = Number(this.subTotal) - Number(this.totalPayment);
    this.saldoFinal.emit(this.saldo);
  }
}
