import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, NgModel } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent  {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}
  @Output()
  success=new EventEmitter<boolean>();
  items: any;
  primaryForm = new UntypedFormGroup({
    name: new UntypedFormControl(),
    rut: new UntypedFormControl(''),
    turn: new UntypedFormControl(''),
    type:new UntypedFormControl("1"),
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
    this.api.createProviders(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Proveedor creado correctamente', 'Gestión Proveedor');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  openModal(md: any,size='md') {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
