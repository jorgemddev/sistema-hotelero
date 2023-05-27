import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})

export class AddProductComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Inicio desde edit product");
  }
  status: any;
  categorys: any;
  brands: any;
  models: any;

  @Output()
  success = new EventEmitter<boolean>();

  @Input()
  id: number;

  ngOnInit(): void {
    if (this.id > 0) {
      this.getProduct(this.id);
    }
    this.getData();
  }

  items: any;
  familys: any;
  providers:any;

  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    barcode: new UntypedFormControl(''),
    amount: new UntypedFormControl(1),
    type: new UntypedFormControl(1),
    serie: new UntypedFormControl(''),
    sku: new UntypedFormControl(''),
    stkmin: new UntypedFormControl(0),
    stkmax: new UntypedFormControl(0),
    neto: new UntypedFormControl(0),
    gain: new UntypedFormControl(30),
    tax: new UntypedFormControl(19),
    sale: new UntypedFormControl(0),
    providers_id: new UntypedFormControl(0),
    family_id: new UntypedFormControl(0),
    brand_id: new UntypedFormControl(0),
    model_id: new UntypedFormControl(0),
  });

  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
  });
  tForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    brand_id: new UntypedFormControl()
  });


  save() {
      this.create();
  }
  create() {
    this.api.createProduct(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Producto creado correctamente', 'Gestión producto');
        this.success.emit(true);
        this.primaryForm.reset();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }

  openModal(mdl: any, size = 'md') {
    this.modal.open(mdl, {
      size: size
    });
  }
  getProduct(id: number) {
    this.api.getProduct(id).subscribe(
      (response) => {
        this.toast.info('Producto encontrado');
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('', 'Producto no encontrado');
        this.modal.dismissAll();
      }
    );
  }
  getData() {
    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
    this.api.getBrands().subscribe(
      (response) => {
        this.brands = response.data;
        this.selectBrand();
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
    this.api.listFamilys(1).subscribe(
      (response) => {
        var data=response.data as Paginate;
        this.familys = data.items;
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
    this.api.getProviders().subscribe(
      (response) => {
        this.providers = response.data
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
  public selectBrand(): void {
    var brand_id = this.primaryForm.get('brand_id').value;
    if (brand_id > 0) {
      this.api.getFilterModels(brand_id).subscribe(
        (response) => {
          this.models = response.data;
        },
        (e) => {
          this.toast.warning(
            e.error.mistakes,
            e.error.msg
          );
        }
      );
    } else {
      this.primaryForm.get('model_id').setValue(0);
    }
  }
  calculePrice(){
    var sale=0;
    var neto=parseInt(this.primaryForm.get('neto').value)
    var tax=parseInt(this.primaryForm.get('tax').value);
    var gain =parseInt(this.primaryForm.get('gain').value);
    var sl=((neto*gain)/100)+neto;
    console.log("GANANCIA:"+sl);
    var tx=((sl*tax)/100);
    console.log("INPUESTO:"+tx);
    sale=sl+tx;
    this.primaryForm.get('sale').setValue(sale);    

  }
}
