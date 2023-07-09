import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-charges',
  templateUrl: './add-charges.component.html',
  styleUrls: ['./add-charges.component.css']
})
export class AddChargesComponent implements OnInit {
  payment: any;
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnInit(): void {


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
    this.api.createCharges(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Cobro registrado correctamente', 'Gestión de cobros');
        this.success.emit(true);
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

}
