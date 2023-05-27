import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-purchase-order',
  templateUrl: './list-purchase-order.component.html',
  styleUrls: ['./list-purchase-order.component.css']
})
export class ListPurchaseOrderComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
  ) { }
  status: any;
  categorys: any;
  idSelected: number = 0;
  ngOnInit(): void {
    this.getData();
    this.getPurchases();
  }
  @Input()
  providers_id: number=0;

  items: any = null;
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
    this.api.deleteOrdersPurchase(this.secondForm).subscribe(
      (response) => {
        this.toast.success(
          'Producto eliminado correctamente',
          'Gestión productos'
        );
        this.modal.dismissAll();
        this.getPurchases();
      },
      (e) => {
        
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['inventario/proveedores/ordenes-de-compra/editar/' + id]);
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
  getPurchases() {
    this.api.getPurchasesProvidersFilter(this.providers_id,  this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
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
  openModalEdit(md: any, size: string = 'md',purchases_id) {
    this.idSelected=purchases_id;
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
    this.getPurchases();
  }
  clean() { }
}
