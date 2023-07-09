import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { Parking } from 'src/app/models/interfaces/parking';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
  ) { }
  @Input()
  providers_id: number = 0;
  @Input()
  clients_id: number = 0;
  @Input()
  reservations_id: number = 0;
  @Input()
  hiddenButton: boolean = false;
  view: number = 1;
  status: any;
  categorys: any;
  idSelected: number = 0;
  ngOnInit(): void {
    this.setFilter();
    this.getParking();
  }

  items: Parking[];
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  //Id enviado para las soliciotudes
  idSend: number;
  filter: string;

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
    this.api.deleteNote(this.secondForm).subscribe(
      (response) => {
        this.toast.success(
          'Producto eliminado correctamente',
          'Gestión productos'
        );
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['inventario/proveedores/editar/' + id]);
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
  getParking() {
    this.api.getCarsParking(this.idSend,this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items as Parking[];
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
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
    this.getParking();
  }
  clean() { }
}
