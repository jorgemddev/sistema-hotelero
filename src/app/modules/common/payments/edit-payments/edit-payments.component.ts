import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Helps } from 'src/app/libs/helps';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-payments',
  templateUrl: './edit-payments.component.html',
  styleUrls: ['./edit-payments.component.css']
})
export class EditPaymentsComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private helps: Helps,
    private modal: NgbModal
  ) { }
  ngOnInit(): void {
    this.years = [];
    let yearNow = this.helps.date().getFullYear();
    for (let i = 1950; i <= yearNow; i++) {
      this.years.push(i);
      this.years.reverse();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id > 0) {
      console.log('desde Note edit:' + this.id);
      this.getParking(this.id);
    }
  }
  @Output()
  success = new EventEmitter<boolean>();

  @Input()
  id: number;

  @Input()
  providersId: number;
  @Input()
  clientsId: number;

  @Input()
  reservationsId: number;

  years: any;

  items: any;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    ppu: new UntypedFormControl(''),
    brand: new UntypedFormControl(''),
    model: new UntypedFormControl(''),
    type: new UntypedFormControl('AUTOMÓVIL'),
    year: new UntypedFormControl(2023),
    parking: new UntypedFormControl(''),
    providers_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    reservations_id: new UntypedFormControl(0),
  });

  update() {
    this.primaryForm.get('providers_id').setValue(this.providersId);
    this.primaryForm.get('clients_id').setValue(this.clientsId);
    this.primaryForm.get('reservations_id').setValue(this.reservationsId);
    this.api.updateCars(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Vehículo modificado correctamente', 'Gestión Estacionamiento');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  getParking(id: number) {
    this.api.getParking(id).subscribe(
      (response) => {
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('Registro de estacionamiento no encontrado');
        this.modal.dismissAll();
      }
    );
  }
  openModal(md: any, size = 'md') {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
