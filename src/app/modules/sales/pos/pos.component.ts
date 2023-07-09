import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { Payments } from 'src/app/models/interfaces/payments';
import { ApiSalesService } from '../api-sales.service';
import { CashMovements } from 'src/app/models/interfaces/register-movements';
import { Breakdown } from 'src/app/models/breakdown';
import { CashService } from 'src/app/services/cash.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit, OnChanges {
  error: any;
  constructor(
    private api: ApiSalesService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private cashStatusService: CashService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.exitsPos$ = this.cashStatusService.getCashStatus();
  }  
  ngOnInit(): void {
    this.exitsPos$ = this.cashStatusService.getCashStatus();
    this.getMovements();
  }
  exitsPos$: Observable<boolean>;
  @Input()
  view: boolean = true;
  @Input()
  cashmanagement_id: number = 0;


  @Input()
  hiddenButton: boolean = false;



  @Output() totalPay = new EventEmitter<number>();


  total: number = 0;

 

  items: CashMovements[];
  breakdown: Breakdown[];
  efectivo: number = 0;

  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    barcode: new UntypedFormControl(''),
    serie: new UntypedFormControl(''),
    sku: new UntypedFormControl(''),
    brand_id: new UntypedFormControl(),
    model_id: new UntypedFormControl(''),
    family_id: new UntypedFormControl(0),
    state_id: new UntypedFormControl(0),
    from: new UntypedFormControl(0),
    to: new UntypedFormControl(0),
  });


  goToUpdate(id: number) {
    this.router.navigate(['inventario/proveedores/editar/' + id]);
  }

  getMovements() {
    this.api.getMovements().subscribe(
      (response) => {
        let data = response.data as Paginate;
        this.items = data.items as CashMovements[];
        this.breakdown = data.other as Breakdown[];
        if (this.breakdown?.length > 0) {
          this.efectivo = this.breakdown.find(b => b.payment_id == 2)?.results?.total;
        }
      }
    );
  }
  openModal(md: any, size: string = 'md') {
    this.modal.open(md, {
      size: size,
    });
  }
  search() {
    this.getMovements();
  }
  clean() { }
  getTotal(): number {
    let sum = 0;
    if (this.breakdown?.length > 0) {
      this.breakdown.forEach(b => {
        sum = Number(sum) + Number(b.results?.total);
      });
    }
    return sum;
  }
}
