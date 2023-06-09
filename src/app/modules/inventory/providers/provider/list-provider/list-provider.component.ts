import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.css']
})
export class ListProviderComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,

  ) { }
  view: number = 1;
  status: any;
  categorys: any;
  idSelected: number = 0;
  ngOnInit(): void {
    this.getData();
    this.getProviders();
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
    cities_id: new UntypedFormControl(0),
    state_id: new UntypedFormControl(0),
    from: new UntypedFormControl(0),
    to: new UntypedFormControl(0),
  });
  secondForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  delete() {
    this.api.deleteProviders(this.secondForm).subscribe(
      (response) => {
        this.toast.success(
          'Producto eliminado correctamente',
          'Gestión productos'
        );
        this.modal.dismissAll();
        this.getProviders();
      },
      (e) => {
        
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['inventario/proveedores/editar/' + id]);
  }
  goToCreate() {
    console.log('crete');
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
  getProviders() {
    this.api.listProviders(this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
      },
      (e) => {
       
        this.toast.warning(e.error.mistakes,e.error.msg);
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
  search() {
    this.getProviders();
  }
  clean() { }
}
