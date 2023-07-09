import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RutFormat, formatRut } from '@fdograph/rut-utilities';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Clients } from 'src/app/models/interfaces/clients';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: 'edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private router: Router,
    private routeActive: ActivatedRoute
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    var data = this.routeActive.snapshot.params;
    this.clients_id=data['id'];
    if (this.clients_id > 0) {
      this.clients_id;
      this.getClient(this.clients_id);
    } else if ((data['id'] != null)) {
      this.getClient(data['id']);
    } else {
      this.router.navigate(['/hotel/clientes/gestión']);
    }
  }
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    this.clients_id=data['id'];
    if (this.clients_id > 0) {
      this.clients_id;
      this.getClient(this.clients_id);
    } else if ((data['id'] != null)) {
      this.getClient(data['id']);
    } else {
      this.router.navigate(['/hotel/clientes/gestión']);
    }
  }

  @Input()
  template: string;
  @Input()
  clients_id: number = 0;

  @Input()
  modalRef: NgbModalRef | undefined;

  @Output()
  success = new EventEmitter<boolean>();
  @Output()
  record = new EventEmitter<Clients>();
  id: number = 0;
  active = 1;
  items: any;
  view: number = 1;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    lastname: new UntypedFormControl(),
    rut: new UntypedFormControl(''),
    turn: new UntypedFormControl(''),
    type: new UntypedFormControl('1'),
    location: new UntypedFormControl(''),
    img_path: new UntypedFormControl(''),
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

  getClient(id: number) {
    this.api.getClient(id).subscribe(
      (response) => {
        this.form.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('', 'Cliente no encontrado');
        this.router.navigate(['/hotel/clientes/gestión']);
      }
    );
  }
  update() {
    this.api.updateClients(this.form).subscribe(
      (response) => {
        this.toast.success(
          response.msg,
          'Gestión Clientes'
        );
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
      this.form
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
