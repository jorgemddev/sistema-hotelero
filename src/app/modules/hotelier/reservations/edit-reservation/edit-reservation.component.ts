import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { RutFormat, formatRut } from '@fdograph/rut-utilities';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Helps } from 'src/app/libs/helps';
import { Subject, debounceTime } from 'rxjs';
import { Clients } from 'src/app/models/interfaces/clients';
import { Rooms } from 'src/app/models/interfaces/rooms';
import { ApiService } from 'src/app/services/api.service';
import { Reservations } from 'src/app/models/interfaces/reservations';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  @ViewChild('addClient', { static: true }) addClient: TemplateRef<any>;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private helps: Helps
  ) { }
  ngOnInit(): void {
    console.log(this.reservations_id);
    this.filterReservations();
    this.getTypePayment();
    if (this.reservations_id > 0) {
      this.getReservation();
    }else{
      console.log("NO RECIBIDO");
      this.modal.dismissAll();
    }

    this.keyUpSubject
      .pipe(debounceTime(800)) // Establece un tiempo de espera de 500 ms (ajústalo según tus necesidades)
      .subscribe((search) => {
        this.getClientByRut(search);
      });
  }
  private keyUpSubject = new Subject<string>();

  modalOtherRef: NgbModalRef | undefined;
reservation:Reservations;

  @Input()
  reservations_id: number;

  @Output()
  success = new EventEmitter<boolean>();
  client: Clients;

  btnNewClient: boolean = false;
  days: number = 0;
  contact: Clients;
  rooms: Rooms[];
  payment: any;
  roomSelected: Rooms;
  form = new UntypedFormGroup({
    id:new UntypedFormControl(0),
    reservations_id:new UntypedFormControl(0),
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
    check_ing: new UntypedFormControl({value:'',disabled:true}),
    hour_ing: new UntypedFormControl({value:'',disabled:true}),

    rooms_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    total_price: new UntypedFormControl(0),
    capacity: new UntypedFormControl({ value: '', disabled: true }),

    price: new UntypedFormControl(0),
    aditional: new UntypedFormControl(0),
    price_aditional: new UntypedFormControl(0),
    abono:new UntypedFormControl(0),
    payment_id:new UntypedFormControl(0),
    payment_ref:new UntypedFormControl(0),

    rut: new UntypedFormControl({ value: '', disabled: false }),
    name: new UntypedFormControl({ value: '', disabled: true }),
    lastname: new UntypedFormControl({ value: '', disabled: true }),
    phone: new UntypedFormControl({ value: '', disabled: true }),
    email: new UntypedFormControl({ value: '', disabled: true }),
  });
  getTypePayment() {
    this.api.getTypePayments().subscribe((res) => {
      this.payment = res.data;
    });
  }
  update() {
    this.api.updateReservations(this.form).subscribe(
      (res) => {
        this.toast.success('Reservación modificada', 'Gestión reservas');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  getReservation() {
    this.api.getReservation(this.reservations_id).subscribe((res) => {
      this.form.patchValue(res.data);
      this.form.get('id')?.setValue(this.reservations_id);
      this.reservation=res.data as Reservations;
      this.getClientByRut(this.reservation?.client?.rut);
      setTimeout(this.calculePrice,500);
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
  filterReservations() {
    this.form.get('reservations_id').setValue(this.reservations_id);
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
    this.form.get('rooms_id')?.setValue(room?.id);
    this.form.get('price')?.setValue(room?.price);
    this.form.get('capacity')?.setValue(room?.capacity);
  }
  calculePrice() {
    let start = this.form?.get('start')?.value;
    let end = this.form?.get('end')?.value;
    this.days = this.helps?.countDays(start, end);
    let price_room = parseInt(this.form?.get('price').value);
    let price1: number = 0;
    if (price_room) {
      price1 = price_room * this.days;
      this.form?.get('total_price').setValue(price1);
      let aditional = parseInt(this.form?.get('aditional').value);
      let price_aditional = parseInt(this.form?.get('price_aditional').value);
      if ((aditional > 0) && (price_aditional > 0)) {
        price1 = price1 + (price_aditional * aditional);
        this.form?.get('total_price').setValue(price1);
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
  getClientByRut(rut: any) {
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
        this.form.get('clients_id').setValue(this.client?.id);
        this.form.get('name').setValue(this.client?.name);
        this.form.get('lastname').setValue(this.client?.lastname);
        this.form.get('phone').setValue(this.client?.phone);
        this.form.get('email').setValue(this.client?.email);
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
  setClient(client:Clients){
    this.form.get('clients_id').setValue(client?.id);
    this.form.get('name').setValue(client?.name);
    this.form.get('lastname').setValue(client?.lastname);
    this.form.get('phone').setValue(client?.phone);
    this.form.get('email').setValue(client?.email);
  }
}



