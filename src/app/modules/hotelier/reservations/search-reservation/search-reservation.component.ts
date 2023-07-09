import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { RutFormat, formatRut } from '@fdograph/rut-utilities';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { Clients } from 'src/app/models/interfaces/clients';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { ApiSearchService } from 'src/app/modules/common/searches/api-search.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search-reservation',
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.css']
})
export class SearchReservationComponent implements OnInit {
  constructor(private api: ApiService, private toast: ToastrService, private modal: NgbModal) { }
  ngOnInit(): void {
    this.keyUpSubject
      .pipe(debounceTime(800)) // Establece un tiempo de espera de 500 ms (ajústalo según tus necesidades)
      .subscribe((search) => {
        this.getClientByRut(search);
      });
  }
  @Output()
  success = new EventEmitter<boolean>();

  @Output()
  selected = new EventEmitter<Reservations>();
  modalRef: NgbModalRef;

  form = new UntypedFormGroup({
    clients_id: new UntypedFormControl(),
    reservations_id: new UntypedFormControl(),
    rut: new UntypedFormControl(''),
    name: new UntypedFormControl({ value: '', disabled: true }),
    lastname: new UntypedFormControl({ value: '', disabled: true }),
  });
  private keyUpSubject = new Subject<string>();
  modalOtherRef: any;
  contact: Clients;
  client: Clients;
  reservations: Reservations[];
  search() {
    this.api.getReservation(this.form?.get('reservations_id').value).subscribe((res) => {
      this.toast.success("RESERVA ENCONTRADA");
      this.success.emit(true);
      let reservation:Reservations =res.data as Reservations;
      this.selected.emit(reservation);
      //this.modal.dismissAll();
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
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
      this.client = clie[0];
      this.form.patchValue(this.client);
      this.form.get('clients_id').setValue(this.client?.id);
      this.getReservations(rut);
    }, (e) => {
      this.toast.info("Cliente no encontrado, reintente");
      this.client = null;
    });
  }

  getReservations(rut: string) {
    this.api.getReservationByRut(rut).subscribe((res) => {
      this.reservations = res.data as Reservations[];
      this.form.get('reservations_id').setValue(this.reservations[0]?.id);

    }, (e) => {
      this.toast.info("No se encontraron reservaciónes, reintente");
    });
  }
onSelected(){
  let reserv=this.reservations.find(res=>res.id===this.form.get('reservations_id')?.value);
  this.selected.emit(reserv);
  //this.modal.dismissAll();
}
}


