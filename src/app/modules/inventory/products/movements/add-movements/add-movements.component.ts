import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Buttons, Toolbar as NyToolbar } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { Clients } from 'src/app/models/interfaces/clients';
import { Products } from 'src/app/models/interfaces/products';
import { Records } from 'src/app/models/interfaces/records';
import { TemplateDocuments } from 'src/app/models/interfaces/template-documents';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-movements',
  templateUrl: './add-movements.component.html',
  styleUrls: ['./add-movements.component.css']
})
export class AddMovementsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private routeActive: ActivatedRoute,
    private router:Router
  ) { }

  //declaro el modulo de plantilla de documento
  module_id: number = 1;
  clients: Clients[];
  templates_document: any;
  @Output()
  success = new EventEmitter<boolean>();

  @Input()
  client_id: number = 0;

  ngOnInit(): void {
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        this.primaryForm.get('clients_id').setValue(this.client_id);
      }
    });
    this.getData();
    this.getCompany();
  }
  domain=this.api.domain;
  records: Records;
  product: Products;
  products: Products[] = [];
  subtotal: number = 0;
  total: number = 0;
  tax: number = 19;
  tx: number = 0;
  items: any;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    business: new UntypedFormControl({ value: '', disabled: true }),
    rut: new UntypedFormControl({ value: '', disabled: true }),
    invoice_location: new UntypedFormControl(''),
    invoice_city: new UntypedFormControl(''),
    invoice_contact: new UntypedFormControl(''),
    invoice_email: new UntypedFormControl(''),
    invoice_phone: new UntypedFormControl(''),
    clients_id: new UntypedFormControl(0),
    delivery_date: new UntypedFormControl(''),
    delivery_location: new UntypedFormControl(''),
    template_documents_id: new UntypedFormControl(0),
    content: new UntypedFormControl(''),
    state_id: new UntypedFormControl(0),
  });

  formSecond = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    addCode: new UntypedFormControl(''),
    addName: new UntypedFormControl(''),
    addAmount: new UntypedFormControl(0),
    addObs: new UntypedFormControl(''),

  });
  btn_toolbar: NyToolbar = {
    buttons: [
      {
        id: 1,
        value: "NUEVO",
        iconFaWSome: 'fa-solid fa-circle-plus',
        strClass: 'btn-primary'
      }]
  }
  name: string;
  amount: number;
  sku: string;
  create() {
    this.api.createMovement(this.primaryForm, this.products).subscribe(
      (rs) => {
        this.toast.success('Movimiento creado correctamente', 'Gestión productos');
        this.records = rs.data as Records;
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, error.error.msg, { enableHtml: true });
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
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  getData() {
    this.getAllClients(null);
    this.getModuleTemplate(null);
  }
  getAllClients(data: Clients) {
    this.api.getAllClients().subscribe(
      (response) => {
        this.clients = response.data as Clients[];
        if (data != null) {
          this.primaryForm.get('clients_id')?.setValue(data?.id);
        }
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  getModuleTemplate(data: TemplateDocuments) {
    this.api.getAllModuleDocument(this.module_id).subscribe(
      (response) => {
        this.templates_document = response.data;
        if (data != null) {
          this.primaryForm.get('template_documents_id')?.setValue(data?.id);
        }
      },
      (e) => {
        this.templates_document = [];
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
      id: this.formSecond.get('id')?.value,
      name: this.formSecond.get('addName').value,
      amount: parseInt(this.formSecond.get('addAmount').value),
      sku: this.formSecond.get('addCode').value,
      obs: this.formSecond.get('addObs').value
    };
    if (this.formSecond.get('addName').value.length < 3) {
      this.toast.warning("El nombre del producto / servicio es obligatorio");
      return;
    }
    if (this.formSecond.get('addAmount').value < 1) {
      this.toast.warning("La cantidad minima es 1");
      return;
    }

    this.products.push(this.product);
    this.formSecond.get('id').setValue(0);
    this.formSecond.get('addName').setValue('');
    this.formSecond.get('addAmount').setValue(1);
    this.formSecond.get('addCode').setValue('');
    this.formSecond.get('addObs').setValue('');
    code.focus();
  }
  selectedSearch(item: Products) {
    console.log(item);
    this.formSecond.get('id').setValue(item?.id);
    this.formSecond.get('addCode').setValue((item?.serie)?"SERIE: "+item?.serie:"ID: "+item?.id);
    this.formSecond.get('addName').setValue(item?.name.toUpperCase()  + " " + item?.brand + " " + item?.model);
    this.formSecond.get('addAmount').setValue(1);
  }
  actionButton(event: Buttons) {
    console.log(event);
    switch (event?.id) {
      case 1:
        this.router.navigate(['/inventario/productos/movimiento']);
        break;
    }
  }
  reset(){
    this.products=[];
    this.formSecond.reset();
    this.records=null;
  }
}
