import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CashService } from 'src/app/services/cash.service';

@Component({
  selector: 'app-add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.css']
})
export class AddPaymentsComponent implements OnInit {
  payment: any;
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private cashService: CashService
  ) { }
  ngOnInit(): void {
    this.getTypePayment();
  }
  @Output()
  success = new EventEmitter<boolean>();
  @Input()
  providersId: number;
  @Input()
  clientsId: number;

  @Input()
  reservationsId: number;

  years: any;

  items: any;
  primaryForm = new UntypedFormGroup({
    ammount: new UntypedFormControl(''),
    detail: new UntypedFormControl(''),
    payment_id: new UntypedFormControl(2),
    reservations_id: new UntypedFormControl(0),
    providers_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
  });

  create() {
    this.primaryForm.get('providers_id').setValue(this.providersId);
    this.primaryForm.get('clients_id').setValue(this.clientsId);
    this.primaryForm.get('reservations_id').setValue(this.reservationsId);
    this.api.createPayments(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Pago registrado correctamente', 'Gestión de pagos');
        this.success.emit(true);
        //notificamos que hay un nuevo pago
        this.cashService.setPayment();
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  openModal(md: any, size = 'md') {
    this.modal.open(md, {
      size: 'xl',
    });
  }
  getTypePayment() {
    this.api.getTypePayments().subscribe((res) => {
      this.payment = res.data;
    });
  }
}

