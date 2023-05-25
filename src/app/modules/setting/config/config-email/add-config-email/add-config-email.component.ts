import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-config-email',
  templateUrl: './add-config-email.component.html',
  styleUrls: ['./add-config-email.component.css']
})
export class AddConfigEmailComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {}
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.id=data['id'];
      this.getProvider(data['id']);
    } else {
      this.router.navigate(['/inventario/proveedores/gestión']);
    }
  }
  @Output()
  success = new EventEmitter<boolean>();
  id:number=0;
  active = 1;
  items: any;
  view: number = 1;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
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

  getProvider(id: number) {
    this.api.getProvider(id).subscribe(
      (response) => {
        this.toast.info('Proveedor encontrado');
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('', 'Proveedor no encontrado');
        this.router.navigate(['/inventario/proveedores/gestión']);
      }
    );
  }
  update() {
    this.api.updateProviders(this.primaryForm).subscribe(
      (response) => {
        this.toast.success(
          'Proveedor creado correctamente',
          'Gestión Proveedor'
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
