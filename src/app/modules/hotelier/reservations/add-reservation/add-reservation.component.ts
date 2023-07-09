import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { RutFormat, formatRut } from '@fdograph/rut-utilities';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { Clients } from 'src/app/models/interfaces/clients';
import { Rooms } from 'src/app/models/interfaces/rooms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  @ViewChild('addClient', { static: true }) addClient: TemplateRef<any>;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private helps: Helps
  ) { }
  ngOnInit(): void {
    console.log("INGRESO ADD RESERVATION");
    if ((this.startDefault != null) && (this.endDefault != null) && (this.roomDefault != null)) {
      console.log("ROOM DEFAULT", this.roomDefault);
      this.form.get('start').setValue(this.startDefault.toISOString().substring(0, 10));
      this.form.get('end').setValue(this.endDefault.toISOString().substring(0, 10));
      this.form.get('startV').setValue(this.startDefault.toISOString().substring(0, 10));
      this.form.get('endV').setValue(this.endDefault.toISOString().substring(0, 10));
      this.form.get('rooms_id')?.setValue(this.roomDefault?.id);
      this.roomSelected = this.roomDefault;
      this.form.patchValue(this.roomDefault);
      this.calculePrice();
    } else {
      this.form.get('start').setValue(this.helps.date().toISOString().substring(0, 10));
      this.form.get('end').setValue(this.helps.date().toISOString().substring(0, 10));
      this.filterReservations();
    }
    this.getTypePayment();
    this.keyUpSubject
      .pipe(debounceTime(800)) // Establece un tiempo de espera de 500 ms (ajústalo según tus necesidades)
      .subscribe((searchTerm) => {
        this.getClientByRut(searchTerm);
      });
  }
  getTypePayment() {
    this.api.getTypePayments().subscribe((res) => {
      this.payment = res.data;
    });
  }
  private keyUpSubject = new Subject<string>();

  modalOtherRef: NgbModalRef | undefined;

  @Input()
  roomDefault: Rooms;
  @Input()
  startDefault: Date;
  @Input()
  endDefault: Date;




  @Output()
  success = new EventEmitter<boolean>();
  client: Clients;

  btnNewClient: boolean = false;
  days: number = 0;
  contact: Clients;
  rooms: Rooms[];
  payment: any;
  saldo: number;
  roomSelected: Rooms;
  form = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
    startV: new UntypedFormControl({ value: '', disabled: true }),
    endV: new UntypedFormControl({ value: '', disabled: true }),
    rooms_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    total_price: new UntypedFormControl(0),
    abono: new UntypedFormControl(0),
    capacity: new UntypedFormControl({ value: '', disabled: true }),
    price: new UntypedFormControl(0),
    aditional: new UntypedFormControl(0),
    price_aditional: new UntypedFormControl(0),
    payment_id: new UntypedFormControl(0),
    payment_ref: new UntypedFormControl(''),
    obs: new UntypedFormControl(''),
    rut: new UntypedFormControl({ value: '', disabled: false }),
    name: new UntypedFormControl({ value: '', disabled: true }),
    lastname: new UntypedFormControl({ value: '', disabled: true }),
    phone: new UntypedFormControl({ value: '', disabled: true }),
    email: new UntypedFormControl({ value: '', disabled: true }),
  });

  create() {
    this.api.createReservations(this.form).subscribe(
      (res) => {
        this.toast.success('Reservación creada', 'Gestión reservas');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  filterReservations() {
    this.form.get('rooms_id').setValue(0);
    this.form.get('price').setValue(0);
    this.form.get('capacity').setValue(0);
    this.api.getRoomsAvailable(this.form).subscribe(
      (res) => {
        this.rooms = res.data as Rooms[];
      }, (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      });
  }
  onSelectedRoom() {
    let room = this.rooms.find(froom => froom.id === this.form.get('rooms_id')?.value);
    this.roomSelected = room;
    this.form.patchValue(room);
  }
  calculePrice() {
    let start = this.form.get('start')?.value;
    let end = this.form.get('end')?.value;
    this.days = this.helps.countDays(start, end);
    let price_room = parseInt(this.form.get('price').value);
    let price1: number = 0;
    if (price_room) {
      price1 = price_room * this.days;
      this.form.get('total_price').setValue(price1);
      let aditional = parseInt(this.form.get('aditional').value);
      let price_aditional = parseInt(this.form.get('price_aditional').value);
      if ((aditional > 0) && (price_aditional > 0)) {
        price1 = price1 + (price_aditional * aditional);
        this.form.get('total_price').setValue(price1);
      }
      this.saldo = price1;
      if (parseInt(this.form.get('abono')?.value) > 0) {
        this.saldo = price1 - parseInt(this.form.get('abono')?.value);
      }
    }




  }
  onFormatRut(value: any) {
    let rut = value.target.value;
    if (rut.length > 8) {
      rut = formatRut(rut, RutFormat.DOTS_DASH)
      this.form
        .get('rut')
        ?.setValue(rut);
      this.keyUpSubject.next(rut);
    } else {
      this.keyUpSubject.next(rut);
    }
  }
  getClientByRut(rut: string) {
    this.api.searchClientByRut(rut).subscribe((res) => {
      let clie = res.data as Clients[];
      if (res.other == "2") {
        //significa que es contacto de un cliente o proveedor
        setTimeout(() => {
          this.modalOtherRef = this.modal.open(this.addClient);
          this.contact = clie[0];
          this.contact.type = "2";
        }, 500);
      } else {
        this.client = clie[0];
        this.setClient(this.client);
        this.form.get('clients_id').setValue(this.client?.id);
      }
    }, (e) => {
      this.btnNewClient = true;
      this.toast.info("Cliente no encontrado, ingreselo");
      this.client = null;
      this.form.get('clients_id').setValue(0);
      this.form.get('name').setValue('');
      this.form.get('lastname').setValue('');
      this.form.get('phone').setValue('');
      this.form.get('email').setValue('');
      this.form.get('aditional').setValue(0);
    });
  }
  openModal(md: any, size: string = 'md') {
    this.modalOtherRef = this.modal.open(md, {
      size: size,
    });
  }
closeModal(){
  this.modal.dismissAll();
}
setClient(client:Clients){
  this.form.get('clients_id').setValue(client?.id);
  this.form.get('name').setValue(client?.name);
  this.form.get('lastname').setValue(client?.lastname);
  this.form.get('phone').setValue(client?.phone);
  this.form.get('email').setValue(client?.email);
}
}

