import { compileDeclareClassMetadata, ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/interfaces/products';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-purchase-order',
  templateUrl: './add-purchase-order.component.html',
  styleUrls: ['./add-purchase-order.component.css']
})
export class AddPurchaseOrderComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private routeActive: ActivatedRoute,
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

  ngOnInit(): void {
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        this.getData();
        var id = params.get('id');
        this.primaryForm.get('providers_id').setValue(this.provider_id);
      }
    });
    this.getCompany();
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

  create() {
    this.api.createPurchase(this.primaryForm, this.products).subscribe(
      (response) => {
        this.toast.success('Orden de compra creada correctamente', 'Gestión producto');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  getCompany() {
    this.api.getCompany().subscribe(
      (response) => {
        let data = response.data as any;
        this.primaryForm.patchValue(response.data);
        this.primaryForm.get('invoice_city').setValue(data.city);
        this.primaryForm.get('invoice_location').setValue(data.location);
        this.primaryForm.get('invoice_phone').setValue(data.phone);
        this.primaryForm.get('invoice_email').setValue(data.email);
      },
      (e) => {
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  getData() {
    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },
      (e) => {
        
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
    this.api.getProviders().subscribe(
      (response) => {
        this.providers = response.data;
      },
      (e) => {
        
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
    this.api.getPayments().subscribe(
      (response) => {
        this.primaryForm.get('payments_id').setValue(1);
        this.payments = response.data;
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
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike', 'text_color'],
  ];
  addProductOrder(code: any) {

    this.product = {
      name: this.formSecond.get('addName').value, amount: parseInt(this.formSecond.get('addAmount').value), sku: this.formSecond.get('addCode').value, price: parseInt(this.formSecond.get('addNeto').value)
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
    this.subtotal = this.subtotal + (this.product.price * this.product.amount);
    this.tx = ((this.subtotal * this.primaryForm.get('tax').value) / 100);

    this.total = this.subtotal + this.tx;
    code.focus();
  }
  selectedSearch(item: Products) {
    console.log(item);
    this.formSecond.get('addCode').setValue(item.sku);
    this.formSecond.get('addName').setValue(item.name + " " + item.brand + " " + item.model);
    this.formSecond.get('addAmount').setValue(1);
    this.formSecond.get('addNeto').setValue(item.neto);
  }
  calculePrice() {
    this.tx = ((this.subtotal * this.primaryForm.get('tax').value) / 100);
    this.total = this.subtotal + this.tx;
  }
}
