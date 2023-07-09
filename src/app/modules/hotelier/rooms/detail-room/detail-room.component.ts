import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { FullCalendarComponent } from '@fullcalendar/angular/full-calendar.component';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Helps } from 'src/app/libs/helps';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Rooms } from 'src/app/models/interfaces/rooms';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.css']
})
export class DetailRoomComponent implements OnInit, OnChanges {
  constructor(private api: ApiService, private toast: ToastrService, private helps: Helps, private routeActive: ActivatedRoute, private modal: NgbModal) { }
  @ViewChild('editReservation', { static: true }) editReservation: TemplateRef<any>;
  @ViewChild('calendar') fullCalendar: FullCalendarComponent;

  ngOnChanges(changes: SimpleChanges): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.rooms_id=data['id'];
      this.form.get('id').setValue(data['id']);
      this.form.get('start').setValue(this.helps.firstDayMonth().toISOString().substring(0, 10));
      this.form.get('end').setValue(this.helps.lastDayMonth().toISOString().substring(0, 10));
      this.filterReservations();
    }
  }
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.rooms_id=data['id'];
      this.form.get('id').setValue(data['id']);
      this.form.get('start').setValue(this.helps.firstDayMonth().toISOString().substring(0, 10));
      this.form.get('end').setValue(this.helps.lastDayMonth().toISOString().substring(0, 10));
      this.getRoom();
      this.filterReservations();
    }
  }

  rooms_id:number;
  reservation_id: number;
  @Input()
  room: Rooms;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });


  reservations: any;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelection.bind(this),
    dateClick: this.handleDateClick.bind(this),
    datesSet: this.handleDatesSet.bind(this),
    eventClick: this.handleEventClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
  };
  handleDatesSet(arg: any) {
    //primer dia del calendario actual
    const startDate = new Date(arg.view.currentStart);
    //ultimo dia del calendario actual
    const endDate = new Date(arg.view.currentEnd);
    this.form.get('start').setValue(this.helps.firstDayMonth(startDate.getMonth(), startDate.getFullYear()).toISOString().substring(0, 10));
    this.form.get('end').setValue(this.helps.lastDayMonth(startDate.getMonth(), startDate.getFullYear()).toISOString().substring(0, 10));

    this.filterReservations();
  }

  handleDateClick(arg: any) {
    // Verificar si se ha cambiado de mes
    const currentMonth = this.calendarOptions?.headerToolbar;
    const clickedDate = arg.date.getMonth();

    if (currentMonth !== clickedDate) {
      console.log('Cambio de mes:', clickedDate);
      // Aquí puedes agregar la lógica para activar el evento deseado cuando cambie el mes en la barra superior
      // ...
    }
  }
  handleEventClick(arg: any) {
    console.log('Evento clickeado:', arg.event);
    console.log('Evento reservations:', arg.event.extendedProps.reservations_id);
    this.reservation_id = arg.event.extendedProps.reservations_id;
    // Aquí puedes acceder a todas las propiedades y métodos del objeto del evento
    // Ejemplo: arg.event.title, arg.event.start, arg.event.end, etc.
    this.modal.open(this.editReservation);
  }

  handleDateSelection(info: any) {
    const start = info.start;
    const end = info.end;
    console.log('Rango de fechas seleccionado:', start, end);
    const newEvent = {
      title: 'Nuevo evento',
      start: start,
      end: end
    };
    //this.fullCalendar.getApi().addEvent(newEvent);
    console.log('Evento creado:', newEvent);
  }
  getRoom() {
    this.api.getRoom(this.rooms_id).subscribe((res) => {
      this.room = res.data as any;
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
  filterReservations() {

    this.api.detailReservations(this.form).subscribe((res) => {
      this.fullCalendar.getApi().removeAllEventSources();
      let data = res.data[0] as any;
      this.fullCalendar.getApi().addEventSource(data?.calendar);
      console.log(data?.calendar);

    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
}
