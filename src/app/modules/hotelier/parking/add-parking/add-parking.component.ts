import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { i } from '@fullcalendar/core/internal-common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Helps } from 'src/app/libs/helps';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.css']
})
export class AddParkingComponent implements OnInit {
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

  create() {
    this.primaryForm.get('providers_id').setValue(this.providersId);
    this.primaryForm.get('clients_id').setValue(this.clientsId);
    this.primaryForm.get('reservations_id').setValue(this.reservationsId);
    this.api.createCars(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Vehículo creado correctamente', 'Gestión Estacionamiento');
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
