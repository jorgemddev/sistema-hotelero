import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { Charges } from 'src/app/models/interfaces/charges';
import { Clients } from 'src/app/models/interfaces/clients';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { Rooms } from 'src/app/models/interfaces/rooms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnChanges {
  @ViewChild('searchReversation', { static: true }) searchReversation: TemplateRef<any>;
  @ViewChild('editClient', { static: true }) editClient: TemplateRef<any>;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private router: Router,
    private routeActive: ActivatedRoute,
    private helps: Helps
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.reservations_id = data['id'] as number;
      this.getReservation(this.reservations_id);
      this.modal.dismissAll();
    } else {
      if (!this.reservations) {
        this.modal.open(this.searchReversation, { backdrop: 'static' });
      }
    }
    if (changes['totalPayment']) {
      console.log("DESDE PADRE CAMBIO DE VALOR" + this.totalPayment);
    }

  }
  charges: Charges[];
  totalPayment: number = 0;
  calculateDayLate() {
    let fecha1 = new Date(this.form.get('start')?.value);
    const diferenciaEnMilisegundos = this.helps.date().getTime() - fecha1.getTime();
    this.daysLate = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    console.log("DIAS DE DIFERENCIA:", this.daysLate);
  }
  ngOnInit(): void {
    this.getRooms();
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.reservations_id = data['id'] as number;
      this.getReservation(this.reservations_id);
      this.modal.dismissAll();
    } else {
      if (!this.reservations) {
        this.modal.open(this.searchReversation, { backdrop: 'static' });
      }
    }
  }
  saldo: number = 0;
  reservations: Reservations;

  private keyUpSubject = new Subject<string>();

  modalOtherRef: NgbModalRef | undefined;

  @Input()
  reservations_id: number;

  @Output()
  success = new EventEmitter<boolean>();
  client: Clients;

  btnNewClient: boolean = false;
  days: number = 0;
  contact: Clients;
  rooms: Rooms[];
  roomSelected: Rooms;

  daysLate: number;



  @Input()
  template: string;
  @Input()
  clients_id: number = 0;

  @Input()
  modalRef: NgbModalRef | undefined;


  @Output()
  record = new EventEmitter<Clients>();
  id: number = 0;
  active = 1;
  items: any;
  view: number = 1;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),

    reservations_id: new UntypedFormControl(0),
    start: new UntypedFormControl({ value: '', disabled: true }),
    end: new UntypedFormControl({ value: '', disabled: true }),
    hour_out: new UntypedFormControl(),
    check_out: new UntypedFormControl(),
    rooms_id: new UntypedFormControl({ value: 0, disabled: true }),
    clients_id: new UntypedFormControl(0),
    rut: new UntypedFormControl(''),
    total_price: new UntypedFormControl(0),
    abono: new UntypedFormControl(0),
    capacity: new UntypedFormControl({ value: '', disabled: true }),
    price: new UntypedFormControl(0),
    aditional: new UntypedFormControl(0),
    price_aditional: new UntypedFormControl(0),


  });
  getReservation(id: number) {
    this.api.getReservation(id).subscribe(
      (response) => {
        console.log("RESERVACION ENCONTRADA");
        this.reservations = response.data as any;
        this.form.patchValue(response.data);
        this.form.get('check_out')?.setValue(this.helps.date()?.toISOString().substring(0, 10));
        const hour = this.helps.date()?.getHours().toString().padStart(2, '0');
        const minute = this.helps.date()?.getMinutes().toString().padStart(2, '0');
        this.form.get('hour_out')?.setValue(hour + ":" + minute);
        this.calculateDayLate();
        if (this.reservations?.check_out) {
          this.form?.disable();
        }
      },
      (error) => {
        this.toast.warning('', 'Reservación no encontrada');
      }
    );
  }
  getClient(id: number) {
    this.api.getClient(id).subscribe(
      (response) => {
        this.form.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('', 'Cliente no encontrado');
        this.router.navigate(['/hotel/clientes/gestión']);
      }
    );
  }
  update() {
    console.log(this.saldo);
    if (this.saldo > 0) {
      this.toast.warning("Para realizar el Check Out, la cuenta no debe tener saldo pendiente.");
      return;
    }
    this.api.checkOut(this.form).subscribe(
      (response) => {
        this.toast.success(
          response.msg,
          'Gestión Hotel'
        );
        this.record.emit(response.data as Clients);
        this.success.emit(true);
        this.form.disable();
        if (this.modalRef != null) {
          this.modalRef.close();
        } else {
          this.modal.dismissAll();
        }
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }

  getRooms() {
    this.api.getAllRooms().subscribe((res) => {
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
  openModal(md: any, size: string = 'md') {
    this.modal.open(md, {
      size: size,
    });
  }
  openEditClient = (data: Clients) => {
    console.log(data);
    this.client = data;
    this.form.get('clients_id')?.setValue(data?.id);
    this.modalRef = this.modal.open(this.editClient, { backdrop: 'static' });
  };
  reload() {
    this.getReservation(this.reservations_id);
  }
}



