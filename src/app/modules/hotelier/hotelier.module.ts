import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelierRoutingModule } from './hotelier-routing.module';
import { HotelierComponent } from './hotelier.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ListRoomsComponent } from './rooms/list-rooms/list-rooms.component';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './rooms/list-rooms/add-room/add-room.component';
import { ToolbarSearchComponent } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { SharedsModule } from '../common/shareds/shareds.module';
import { AddServiceComponent } from './rooms/services/add-service/add-service.component';
import { EditServiceComponent } from './rooms/services/edit-service/edit-service.component';
import { EditRoomComponent } from './rooms/list-rooms/edit-room/edit-room.component';
import { ReservationsComponent } from './rooms/reservations/reservations.component';
import { FullCalendarModule } from '@fullcalendar/angular';
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
  ],
  imports: [
    CommonModule,
    HotelierRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedsModule,
    ToolbarSearchComponent,
    FullCalendarModule
  ],
  providers:[Location
  ],
  exports:[HotelierComponent]
})
export class HotelierModule { }
