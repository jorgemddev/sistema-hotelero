import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { startOfMonth, endOfMonth, format, addDays, setMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Helps } from 'src/app/libs/helps';
import { Rooms } from 'src/app/models/interfaces/rooms';
import { Reservations } from 'src/app/models/interfaces/reservations';
import { Icons } from 'src/app/models/interfaces/icons';

// Registra el idioma español
registerLocaleData(localeEs);

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class DashComponent implements OnInit {
  startSelected: Date;
  endSelected: Date;
  roomSelected: Rooms;
  dateSelected: Date;
  selectedReservation: Reservations | null = null;

  constructor(private modal: NgbModal, private api: ApiService, private toast: ToastrService, private helps: Helps) { }

  @ViewChild('addReservations', { static: false }) addReservation: any;

  ngOnInit(): void {
    this.dateNow = this.helps.date();
    console.log(this.dateNow);
    this.mesActual = new Date();
    this.generarFechasMes();
    this.getRooms();


  }
icono:Icons;

  dateNow: Date;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });

  mesActual: Date;
  fechas: Date[];
  rooms: Rooms[];
  //dia inicial del mes
  inicioMes: Date;

  //dia final del mes
  finMes: Date;

  generarFechasMes(): void {
    this.inicioMes = startOfMonth(this.mesActual);
    this.finMes = endOfMonth(this.mesActual);
    const fechas: Date[] = [];

    let currentDate = this.inicioMes;
    while (currentDate <= this.finMes) {
      fechas.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    this.getReservations();
    this.fechas = fechas;
  }

  cambiarMes(delta: number): void {
    this.mesActual = setMonth(this.mesActual, this.mesActual.getMonth() + delta);
    this.generarFechasMes();
  }



  reservas: Reservations[] = []; // Ejemplo de estructura de reservas, puedes ajustarla según tus necesidades

  selectedStartIndex: number = -1;
  selectedEndIndex: number = -1;
  selectedHabitacionIndex: number = -1;

  isReserved(habitacionIndex: number, fechaIndex: number): boolean {
    const habitacion = this.rooms[habitacionIndex];
    const fecha = this.fechas[fechaIndex];
    const reserva = null;
    for (const resv of this.reservas) {
      if (resv.days.includes(fecha.toISOString().substring(0, 10)) && resv.rooms_id === habitacion.id) {
        return true;
      }
    }
    return false;
  }
  isFirstDay(habitacionIndex: number, fechaIndex: number): boolean {
    const habitacion = this.rooms[habitacionIndex];
    const fecha = this.fechas[fechaIndex];
    const reserva = null;
    for (const resv of this.reservas) {

      if (fecha.toISOString().substring(0, 10) === resv?.start && habitacion?.id === resv?.rooms_id) {
        return true;
      }
    }
    return false;
  }
  onCellMouseDown(habitacion: Rooms, fechaIndex: number): void {
    this.roomSelected = habitacion;
    this.selectedStartIndex = fechaIndex;
    this.selectedEndIndex = fechaIndex;
  }

  onCellMouseUp(habitacion: Rooms, fechaIndex: number): void {
    this.selectedEndIndex = fechaIndex;

    const startIndex = Math.min(this.selectedStartIndex, this.selectedEndIndex);
    const endIndex = Math.max(this.selectedStartIndex, this.selectedEndIndex);
    const fechaInicial = this.fechas[startIndex];
    const fechaFinal = this.fechas[endIndex];
    this.startSelected = fechaInicial;
    this.endSelected = fechaFinal;
    this.roomSelected = habitacion;
    if (this.isRangeReserved(habitacion, fechaInicial.toISOString().substring(0, 10), fechaFinal.toISOString().substring(0, 10))) {
      // this.toast.warning("Este periodo ya se encuentra con reserva");
    } else {
      const modalRef = this.modal.open(this.addReservation, { size: 'lg' });
      modalRef.result.then(
        () => {
          // Modal cerrado correctamente, restablecer los índices de celda seleccionados
          this.selectedStartIndex = -1;
          this.selectedEndIndex = -1;
        },
        () => {
          // Modal cerrado de otra manera (por ejemplo, haciendo clic fuera del modal), no hacer nada
          this.selectedStartIndex = -1;
          this.selectedEndIndex = -1;
        }
      );
    }

  }

  onCellMouseEnter(habitacion: Rooms, fechaIndex: number): void {
    //this.selectedEndIndex = fechaIndex;
    if (this.selectedStartIndex !== -1) {
      this.selectedEndIndex = fechaIndex;
    }
    if (this.isSelected(habitacion, fechaIndex)) {
      const fecha = this.fechas[fechaIndex];
      this.selectedReservation = this.reservas.find(reserva =>
        reserva.rooms_id === habitacion.id && reserva.days.includes(fecha.toISOString().substring(0, 10))
      );
    } else {
      this.selectedReservation = null;
    }
  }

  isSelected(habitacion: Rooms, fechaIndex: number): boolean {
    return (
      habitacion === this.roomSelected &&
      fechaIndex >= this.selectedStartIndex &&
      fechaIndex <= this.selectedEndIndex
    );
  }

  getReservations() {
    this.form.get('start').setValue(this.inicioMes.toISOString().substring(0, 10));
    this.form.get('end').setValue(this.finMes.toISOString().substring(0, 10));
    this.api.allRangeReservations(this.form).subscribe((res) => {
      this.reservas = res.data as Reservations[];
      this.reservas.forEach(reserva => {
        reserva.title = "Cliente: " + reserva?.client?.name + " " + reserva?.client?.lastname;
        //reserva.color = this.helps.getRandomColor();
        reserva.color = this.getColorAvailabity(parseInt(reserva?.availability_id));
      });
    });
  }
  setClean(item: Rooms) {
    let status = (item.availability_id == 4) ? 1 : 4;
    const formx = new UntypedFormGroup({
      id: new UntypedFormControl(),
      availability_id: new UntypedFormControl(status),
    });
    formx.get('id').setValue(item.id);
    this.api.setStatusRoom(formx).subscribe((res) => {
      this.toast.success('Ha cambiado el estado de la habitación');
      this.getRooms();
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
  getColorAvailabity(availability_id: number): string {

    switch (availability_id) {
      case 1:
        return "#FFFFFF"
      case 2:
        return "#FF4C33";
      case 3:
        return "#FFD433";
      case 4:
        return "#33FFF3";
      case 5:
        return "#505050";

    }
  }
  getRooms() {
    this.api.getAllRooms().subscribe((res) => {
      this.rooms = res.data as Rooms[];
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
  formatDate(date: Date): string {
    return format(date, 'E dd', { locale: es });
  }
  isRangeReserved(habitacion: Rooms, inicio: string, fin: string): boolean {
    for (const reserva of this.reservas) {
      if (
        reserva.rooms_id === habitacion.id &&
        (
          (inicio >= reserva.start && inicio <= reserva.end) ||
          (fin >= reserva.start && fin <= reserva.end) ||
          (inicio <= reserva.start && fin >= reserva.end)
        )
      ) {
        return true;
      }
    }
    return false;
  }
  getReservation(): Reservations {
    const habitacion = this.roomSelected;
    const fecha = this.dateSelected;

    // Busca la reserva correspondiente a la fecha y habitación específicas
    const reserva = this.reservas.find(reserva => {
      return reserva.rooms_id === habitacion.id && reserva.days.includes(fecha.toISOString().substring(0, 10));
    });

    if (reserva) {
      return reserva;
    } else {
      return null;
    }
  }
  getReservationColor(habitacionIndex: number, fechaIndex: number): string {
    const habitacion = this.rooms[habitacionIndex];
    const fecha = this.fechas[fechaIndex];
    const reserva = this.reservas.find(reserva =>
      reserva.rooms_id === habitacion.id && reserva.days.includes(fecha.toISOString().substring(0, 10))
    );

    return reserva ? reserva.color : ''; // Devolver el color de la reserva o una cadena vacía si no hay reserva
  }


  showinfo(mdl: any, habitacion: Rooms, fecha: Date) {
    this.roomSelected = habitacion;
    this.dateSelected = fecha;
    console.log("kjhkhk");
    this.modal.open(mdl);
  }

  openModal(mdl: any) {
this.modal.open(mdl);
  }

}