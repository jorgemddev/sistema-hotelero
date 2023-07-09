import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmailData } from 'src/app/models/interfaces/email-data';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { Parking } from 'src/app/models/interfaces/parking';
import { Payments } from 'src/app/models/interfaces/payments';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
  ) { }
  @Input()
  view: boolean = true;
  @Input()
  providers_id: number = 0;
  @Input()
  clients_id: number = 0;
  @Input()
  reservations_id: number = 0;
  @Input()
  cashmanagement_id: number = 0;

  @Input()
  hiddenButton: boolean = false;


  @Output() totalPay = new EventEmitter<number>();


  total: number = 0;

  //ref reservations
  reservationSelected: Reservations;

  status: any;
  categorys: any;
  idSelected: number = 0;
  ngOnInit(): void {
    this.setFilter();
    this.getPayments();
  }

  items: Payments[];
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  //Id enviado para las soliciotudes
  idSend: number;
  filter: string;
  moduleEmailId: number = 6;
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
    } else if (this.cashmanagement_id > 0) {
      this.idSend = this.clients_id;
      this.filter = "cashmanagement";
    } else {
      this.idSend = this.reservations_id;
      this.filter = "reservations";
    }
  }
  getPayments() {
    this.api.getListPayments(this.idSend, this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items as Payments[];
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
        this.calculatePayment();
      }
    );
  }
  openSendMailer(md: any, reservation: Reservations, size: string = 'md') {
    this.reservationSelected = reservation;
    this.modal.open(md, {
      size: size,
    });
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
    this.getPayments();
  }
  clean() { }
  dataEmail: EmailData;
  


  calculatePayment() {
    this.total = 0;
    this.items.forEach((pay: Payments) => {
      console.log("PAGOS: ", pay.ammount);
      console.log("TIPO DE PAGO: ", pay.payment_id);
      if (pay.payment_id != 7) {
        this.total = Number(this.total) + Number(pay.ammount);
      } else if (pay?.payment_id == 7 && pay?.confirmed == 1) {
        this.total = Number(this.total) + Number(pay.ammount);
      }

    });
    console.log("EL RESULTADO ES:" + this.total);
    this.totalPay.emit(this.total);
  }
}
