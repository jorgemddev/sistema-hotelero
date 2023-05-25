import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.contactId > 0) {
      this.getContact(this.contactId);
    }
  }
  @Output()
  success = new EventEmitter<boolean>();
  @Input()
  contactId: number = 0;
  @Input()
  providersId: number;
  @Input()
  clientsId: number;
  items: any;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
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
  });
  getContact(id: number) {
    this.api.getContact(id).subscribe(
      (response) => {
        this.toast.info('Contacto encontrado');
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('', 'Proveedor no encontrado');
      }
    );
  }
  update() {
    this.primaryForm.get('providers_id').setValue(this.providersId);
    this.primaryForm.get('clients_id').setValue(this.clientsId);
    this.api.updateContact(this.primaryForm).subscribe(
      (response) => {
        this.toast.success(
          'Contacto modificado correctamente',
          'Gestión Contactos'
        );
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
