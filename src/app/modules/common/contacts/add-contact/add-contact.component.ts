import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnInit(): void {
    if (this.clientsId > 0 || this.reservationsId>0) {
      this.hidePosition = true;
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
  @Input()
  title: string = "AGREGAR NUEVO";
  @Input()
  hidePosition: boolean = false;

  items: any;
  primaryForm = new UntypedFormGroup({
    name: new UntypedFormControl(),
    lastname: new UntypedFormControl(''),
    rut: new UntypedFormControl(''),
    position: new UntypedFormControl(''),
    location: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    whatsapp: new UntypedFormControl(''),
    providers_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    reservations_id: new UntypedFormControl(0),
  });

  create() {
    this.primaryForm.get('providers_id').setValue(this.providersId);
    this.primaryForm.get('clients_id').setValue(this.clientsId);
    this.primaryForm.get('reservations_id').setValue(this.reservationsId);
    this.api.createContact(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Contacto creado correctamente', 'Gestión Contactos');
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
