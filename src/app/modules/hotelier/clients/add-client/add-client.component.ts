import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { RutFormat, formatRut } from '@fdograph/rut-utilities';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Clients } from 'src/app/models/interfaces/clients';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnInit(): void {
    if (this.data != null) {
      this.primaryForm.patchValue(this.data);
    }
  }
  /**
   * Hago referencia a la ventana actual
   */
  @Input()
  modalRef: NgbModalRef | undefined;

  @Input()
  data: any=null;
  @Output()
  success = new EventEmitter<boolean>();
  @Output()
  record = new EventEmitter<Clients>();
  items: any;
  primaryForm = new UntypedFormGroup({
    name: new UntypedFormControl(),
    lastname: new UntypedFormControl(),
    rut: new UntypedFormControl(''),
    turn: new UntypedFormControl(''),
    type: new UntypedFormControl("1"),
    location: new UntypedFormControl(''),
    serie: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    website: new UntypedFormControl(''),
    facebook: new UntypedFormControl(''),
    instagram: new UntypedFormControl(''),
    whatsapp: new UntypedFormControl(''),
    isWebsite: new UntypedFormControl(false),
    isFacebook: new UntypedFormControl(false),
    isInstagram: new UntypedFormControl(false),
    isWhatsapp: new UntypedFormControl(false),
  });

  create() {
    this.api.createClients(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Cliente creado correctamente', 'Gestión Clientes');
        this.record.emit(response.data as Clients);
        this.success.emit(true);
        if (this.modalRef != null) {
          this.modalRef.close();
        } else {
          this.modal.dismissAll();
        }

      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  onFormatRut(value: any) {
    let rut = value.target.value;
    if (rut.length > 8) {
      rut = formatRut(rut, RutFormat.DOTS_DASH)
      this.primaryForm
        .get('rut')
        ?.setValue(rut);
    } 
  }
  openModal(md: any, size = 'md') {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
