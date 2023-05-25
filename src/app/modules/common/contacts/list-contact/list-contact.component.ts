import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css'],
})
export class ListContactComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router
  ) {}
  @Input()
  providers_id: number = 0;
  @Input()
  clients_id: number = 0;

  view: number = 1;
  status: any;
  categorys: any;
  idSelected: number = 0;
  ngOnInit(): void {
    this.getData();
    this.getContacts();
  }

  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  brands: any;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    barcode: new UntypedFormControl(''),
    serie: new UntypedFormControl(''),
    sku: new UntypedFormControl(''),
    brand_id: new UntypedFormControl(),
    model_id: new UntypedFormControl(''),
    family_id: new UntypedFormControl(0),
    state_id: new UntypedFormControl(0),
    from: new UntypedFormControl(0),
    to: new UntypedFormControl(0),
  });
  secondForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  delete() {
    this.api.deleteContacts(this.secondForm).subscribe(
      (response) => {
        this.toast.success(
          'Producto eliminado correctamente',
          'Gestión productos'
        );
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(
          error.error.mistakes,
          'No fue posible eliminar el item'
        );
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['inventario/proveedores/editar/' + id]);
  }
  goToCreate() {

    this.router.navigate(['complementos/slider-principal']);
  }
  getData() {
    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
        this.primaryForm.get('state_id')?.setValue(3);
      },
      (error) => {
        this.error = error;
      }
    );
  }
  getContacts() {

    var id: number = this.providers_id
      ? this.providers_id
      : this.clients_id
      ? this.clients_id
      : 0;
    var filter: string = this.providers_id
      ? 'providers'
      : this.clients_id
      ? 'clients'
      : 'none';
    this.api.getContactsFilter(id,filter, this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;

        this.totalPage = data.total;
      },
      (error) => {
        this.items = null;
        this.page = 1;
        this.collectionSize = 0;
        this.totalPage = 0;
        this.toast;
      }
    );
  }
  openModal(md: any, size: string = 'md') {
    this.modal.open(md, {
      size: size,
    });
  }
  openDelete(id: number, md: any) {
    this.secondForm.get('id').setValue(id);
    this.modal.open(md, {
      size: 'md',
    });
  }
  openEdit(id: number, md: any) {
  this.idSelected=id;
    this.modal.open(md, {
      size: 'md',
    });
  }
  search() {
    this.getContacts();
  }
  clean() {}
}
