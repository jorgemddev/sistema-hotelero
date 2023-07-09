import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Helps } from '../libs/helps';

@Injectable({
  providedIn: 'root'
})
export class CashService  {
  constructor(private helps:Helps){}
  private cashStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private newPay$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getCashStatus(): Observable<boolean> {
    const cashStatus = this.helps.getToken()?.hasStartedCash;
    return of(cashStatus ?? false); // Devuelve false si cashStatus es nulo o indefinido
  }


  getNewPayment(): BehaviorSubject<boolean> {
    return this.newPay$;
  }
  setPayment(){
    this.newPay$.next(true);
  }
}
