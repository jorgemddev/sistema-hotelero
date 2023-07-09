import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelierRoutingModule } from './hotelier-routing.module';
import { HotelierComponent } from './hotelier.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ListRoomsComponent } from './rooms/list-rooms/list-rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './rooms/list-rooms/add-room/add-room.component';
import { ToolbarSearchComponent } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { SharedsModule } from '../common/shareds/shareds.module';
import { AddServiceComponent } from './rooms/services/add-service/add-service.component';
import { EditServiceComponent } from './rooms/services/edit-service/edit-service.component';
import { EditRoomComponent } from './rooms/list-rooms/edit-room/edit-room.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DetailRoomComponent } from './rooms/detail-room/detail-room.component';
import { ClientsComponent } from './clients/clients.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactsModule } from '../common/contacts/contacts.module';
import { NotesModule } from '../common/notes/notes.module';
import { ImageDefaultConfig, ImageDefaultModule } from '../../directives/image-default/image-default.module';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { EditReservationComponent } from './reservations/edit-reservation/edit-reservation.component';
import { CheckInComponent } from './reservations/check-in/check-in.component';
import { CheckOutComponent } from './reservations/check-out/check-out.component';
import { SearchReservationComponent } from './reservations/search-reservation/search-reservation.component';
import { EditorHtmlModule } from '../common/editor-html/editor-html.module';
import { SummaryPaymentComponent } from './reservations/summary-payment/summary-payment.component';
import { PaymentsModule } from '../common/payments/payments.module';
import { ParkingComponent } from './parking/parking.component';
import { AddParkingComponent } from './parking/add-parking/add-parking.component';
import { EditParkingComponent } from './parking/edit-parking/edit-parking.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ViewReservationComponent } from './reservations/view-reservation/view-reservation.component';
import { MailerModule } from '../common/mailer/mailer.module';
import { SalesModule } from '../sales/sales.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


registerLocaleData(localeEs);

const imageConfig: ImageDefaultConfig = {
  defaultImages: {
    default: 'assets/images/default.jpg',
  },
};
@NgModule({

  declarations: [
    HotelierComponent,
    RoomsComponent,
    ListRoomsComponent,
    AddRoomComponent,
    EditRoomComponent,
    AddServiceComponent,
    EditServiceComponent,
    ReservationsComponent,
    DetailRoomComponent,
    ClientsComponent,
    ListClientsComponent,
    AddClientComponent,
    EditClientComponent,
    AddReservationComponent,
    EditReservationComponent,
    CheckInComponent,
    CheckOutComponent,
    SearchReservationComponent,
    SummaryPaymentComponent,
    ParkingComponent,
    AddParkingComponent,
    EditParkingComponent,
    ViewReservationComponent
  ],
  imports: [
    CommonModule,
    HotelierRoutingModule,
    ReactiveFormsModule,
    NotesModule,
    FormsModule,
    SharedsModule,
    ToolbarSearchComponent,
    FullCalendarModule,
    NgbPaginationModule,
    ContactsModule,
    NotesModule,
    NgbModule,
    EditorHtmlModule,
    MailerModule,
    PaymentsModule,
    SalesModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    ImageDefaultModule.forRoot(imageConfig)
  ],

  exports: [HotelierComponent, AddReservationComponent, ReservationsComponent, ViewReservationComponent]
})
export class HotelierModule { }
