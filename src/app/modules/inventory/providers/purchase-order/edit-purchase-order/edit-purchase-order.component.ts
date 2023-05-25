import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/interfaces/products';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.css']
})
export class EditPurchaseOrderComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private routeActive: ActivatedRoute,
    private request: RequestsService
  ) { }

  status: any;
  categorys: any;
  brands: any;
  models: any;
  providers: any;
  payments: any;

  @Output()
  success = new EventEmitter<boolean>();

  @Input()
  provider_id: number = 0;

  @Input()
  purchases_id: number = 0;


  ngOnInit(): void {
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      this.getData();
      if (this.purchases_id > 0) {
        this.getPurchase(this.purchases_id);
      } else if (params.get('id') != null) {
        var id = params.get('id');
        this.getPurchase(parseInt(id));
      } else {

      }
    });

  }
  product: Products;
  products: Products[] = [];
  subtotal: number = 0;
  total: number = 0;
  tax: number = 19;
  tx: number = 0;
  items: any;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    number: new UntypedFormControl(''),
    business: new UntypedFormControl({ value: '', disabled: true }),
    rut: new UntypedFormControl({ value: '', disabled: true }),
    invoice_location: new UntypedFormControl(''),
    invoice_city: new UntypedFormControl(''),
    invoice_contact: new UntypedFormControl(''),
    invoice_email: new UntypedFormControl(''),
    invoice_phone: new UntypedFormControl(''),
    providers_id: new UntypedFormControl(0),
    delivery_date: new UntypedFormControl(''),
    delivery_type: new UntypedFormControl(''),
    delivery_location: new UntypedFormControl(''),
    payments_id: new UntypedFormControl(0),
    tax: new UntypedFormControl(19),
    ref: new UntypedFormControl(''),
    content: new UntypedFormControl(''),
    state_id: new UntypedFormControl(0),
  });

  formSecond = new UntypedFormGroup({
    addCode: new UntypedFormControl(''),
    addName: new UntypedFormControl(''),
    addAmount: new UntypedFormControl(0),
    addNeto: new UntypedFormControl(0),

  });

  name: string;
  amount: number;
  sku: string;
  neto: number;

  update() {
    this.api.updatePurchase(this.primaryForm, this.products).subscribe(
      (response) => {
        this.toast.success('Orden de compra modificada correctamente', 'Gestión producto');
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  getPurchase(id: number) {
    this.api.getPurchase(id).subscribe(
      (response) => {
        let data = response.data as any;
        this.products = data.products;
        this.primaryForm.patchValue(response.data);
        this.calculePriceProducts();
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }

  getData() {
    this.api.getCompany().subscribe(
      (response) => {
        let data = response.data as any;
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.request.setCode(error);
      }
    );

    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },
      (error) => {
        this.request.setCode(error);
      }
    );
    this.api.getProviders().subscribe(
      (response) => {
        this.providers = response.data;
      },
      (error) => {
        this.request.setCode(error);
      }
    );
    this.api.getPayments().subscribe(
      (response) => {
        this.primaryForm.get('payments_id').setValue(1);
        this.payments = response.data;
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  openModal(md: any, size: string = 'md') {
    this.modal.open(md, {
      size: size,
    });
  }
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike', 'text_color'],
  ];
  addProductOrder(code: any) {
    this.product = {
      name: this.formSecond.get('addName').value, amount: parseInt(this.formSecond.get('addAmount').value), sku: this.formSecond.get('addCode').value, neto: parseInt(this.formSecond.get('addNeto').value)
    };
    if (this.formSecond.get('addName').value.length < 3) {
      this.toast.warning("El nombre del producto / servicio es obligatorio");
      return;
    }
    if (this.formSecond.get('addAmount').value < 1) {
      this.toast.warning("La cantidad minima es 1");
      return;
    }
    if (this.formSecond.get('addNeto').value < 0) {
      this.toast.warning("Debe ingresar el precio del producto / servicio");
      return;
    }
    this.products.push(this.product);

    this.formSecond.get('addName').setValue('');
    this.formSecond.get('addAmount').setValue(1);
    this.formSecond.get('addCode').setValue('');
    this.formSecond.get('addNeto').setValue(0);
    this.subtotal = this.subtotal + (this.product.neto * this.product.amount);
    this.tx = ((this.subtotal * this.primaryForm.get('tax').value) / 100);

    this.total = this.subtotal + this.tx;
    code.focus();
  }
  editProductOrder(item: Products, i) {
    this.formSecond.get('addName').setValue(item.name);
    this.formSecond.get('addAmount').setValue(item.amount);
    this.formSecond.get('addCode').setValue(item.sku);
    this.formSecond.get('addNeto').setValue(item.neto);
    this.splice(i);
  }
  selectedSearch(item: Products) {
    console.log(item);
    this.formSecond.get('addCode').setValue(item.sku);
    this.formSecond.get('addName').setValue(item.name + " " + item.brand + " " + item.model);
    this.formSecond.get('addAmount').setValue(1);
    this.formSecond.get('addNeto').setValue(item.neto);
  }
  calculePriceProducts() {
    this.products.forEach(product => {
      this.subtotal = this.subtotal + (product.neto * product.amount);
    });
    this.tx = ((this.subtotal * this.primaryForm.get('tax').value) / 100);
    this.total = this.subtotal + this.tx;
  }
  calculePrice() {
    this.tx = ((this.subtotal * this.primaryForm.get('tax').value) / 100);
    this.total = this.subtotal + this.tx;
  }
  splice(i: number) {
    this.products.splice(i, 1);
    this.subtotal = 0;
    this.calculePriceProducts();
  }
}
