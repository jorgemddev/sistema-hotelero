import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Clients } from 'src/app/models/interfaces/clients';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css'],
})
export class ListContactComponent implements OnInit, OnChanges {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setFilter();
  }
  @Input()
  providers_id: number = 0;
  @Input()
  clients_id: number = 0;
  @Input()
  reservations_id: number = 0;
  @Input()
  personDefault: Person;
  @Input()
  hiddenButton: boolean = false;

  //Id enviado para las soliciotudes
  idSend: number;
  filter: string;

  view: number = 1;
  status: any;
  categorys: any;
  idSelected: number = 0;
  ngOnInit(): void {
    console.log("LIST CONTACTS");
    this.setFilter();
    this.getData();
    this.getContacts();
  }
  setFilter() {
    if (this.clients_id > 0) {
      this.idSend = this.clients_id;
      this.filter = "clients";
    } else if (this.providers_id > 0) {
      this.idSend = this.clients_id;
      this.filter = "providers";
    } else {
      this.idSend = this.reservations_id;
      this.filter = "reservations";
    }
  }
  items: Clients[];
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
          'Registro eliminado correctamente'
        );
        this.getContacts();
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
    this.api.getContactsFilter(this.idSend, this.filter, this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items as Clients[];
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;

        this.totalPage = data.total;
      },
      (error) => {
        this.items = [];
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
    this.idSelected = id;
    this.modal.open(md, {
      size: 'md',
    });
  }
  search() {
    this.getContacts();
  }
  clean() { }
  callBackHandler(person:Clients){
    if (this.personDefault?.callBack) {
      const result = this.personDefault.callBack(person);
      // Hacer algo con el resultado, si es necesario
      console.log(result);
    }
  }
}
export interface Person{
  person:Clients;
  callBackVoid?:()=>void;
  callBack?:(result:any)=>any;
}