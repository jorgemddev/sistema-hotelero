import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { UppercaseDirective } from 'src/app/directives/Uppercase-directive';
import { Helps } from 'src/app/libs/helps';
import { Charges } from 'src/app/models/interfaces/charges';
import { Clients } from 'src/app/models/interfaces/clients';
import { EmailData } from 'src/app/models/interfaces/email-data';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { ApiService } from 'src/app/services/api.service';
import { PdfService } from 'src/app/services/pdf.service';


@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.css']
})
export class ViewReservationComponent implements OnInit {
  @ViewChild('addClient', { static: true }) addClient: TemplateRef<any>;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal,
    private helps: Helps,
    private pdfService: PdfService
  ) { }
  dataEmail: EmailData;



  ngOnInit(): void {
    console.log(this.reservations_id);
    if (this.reservations_id > 0) {
      this.getReservation();
    } else {
      this.modal.dismissAll();
    }
  }
  charges: Charges[];
  totalPayment: number = 0;

  saldo: number = 0;
  modalOtherRef: NgbModalRef | undefined;
  reservation: Reservations;
  moduleEmailId: number = 5;

  @Input()
  reservations_id: number;

  @Output()
  success = new EventEmitter<boolean>();
  client: Clients;

  form = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    reservations_id: new UntypedFormControl(0),
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
    check_ing: new UntypedFormControl({ value: '', disabled: true }),
    check_out: new UntypedFormControl({ value: '', disabled: true }),
    hour_ing: new UntypedFormControl({ value: '', disabled: true }),

    rooms_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    total_price: new UntypedFormControl(0),
    capacity: new UntypedFormControl({ value: '', disabled: true }),

    price: new UntypedFormControl(0),
    aditional: new UntypedFormControl(0),
    price_aditional: new UntypedFormControl(0),
    abono: new UntypedFormControl(0),
    payment_id: new UntypedFormControl(0),
    payment_ref: new UntypedFormControl(0),

    rut: new UntypedFormControl({ value: '', disabled: false }),
    name: new UntypedFormControl({ value: '', disabled: true }),
    lastname: new UntypedFormControl({ value: '', disabled: true }),
    phone: new UntypedFormControl({ value: '', disabled: true }),
    email: new UntypedFormControl({ value: '', disabled: true }),
  });
  getReservation() {
    this.api.getReservation(this.reservations_id).subscribe((res) => {
      this.form.patchValue(res.data);
      this.form.get('id')?.setValue(this.reservations_id);
      this.reservation = res.data as Reservations;
      this.form.disable();
      this.setDataEmail();
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
  setDataEmail() {
    this.dataEmail = {
      modules_id: this.moduleEmailId,
      data: {
        nombre_cliente: this.reservation?.client?.name,
        apellidos_cliente: this.reservation?.client.lastname,
        inicio_reserva: this.reservation?.start,
        termino_reserva: this.reservation?.end,
        habitacion: this.reservation?.rooms?.room_number.toUpperCase(),
        huespedes: this.reservation?.capacity,
        precio_reserva: this.saldo,
      }

    };
  }
  setSaldo(saldo: any) {
    this.saldo = saldo;
  }
  setTotalPayment(payment: any) {
    this.totalPayment = payment;
  }
  openModal(md: any, size: string = 'md') {
    this.modalOtherRef = this.modal.open(md, {
      size: size,
    });
  }
  generatePdf() {
    this.pdfService.detailReservation(this.reservation);
  }
  notifySuccess() {
    this.success.emit(true);
  }
  delete() {
    this.api.deleteReservation(this.form).subscribe((res) => {
      this.toast.success(res.msg);
      this.modal.dismissAll();
      this.success.emit(true);
    }, e => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
}



