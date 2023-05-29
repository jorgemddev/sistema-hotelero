import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/models/guard/admin.guard';
import { RoomsComponent } from './rooms/rooms.component';
import { ListRoomsComponent } from './rooms/list-rooms/list-rooms.component';
import { ReservationsComponent } from './rooms/reservations/reservations.component';
const routes: Routes = [
  {
    path: 'habitaciones',
    canActivate: [AdminGuard],
    component: RoomsComponent,
    data: {
      title: 'HABITACIONES',
      breadcrumb: [
        {
          label: 'Hotel',
          url: 'hotel',
        },
        {
          label: 'Habitaciones',
          url: '',
        },
      ],
    },
    children: [
      {
        path: 'reservas',
        canActivate: [AdminGuard],
        component: ReservationsComponent,
        data: {
          title: 'RESERVAS',
          breadcrumb: [
            {
              label: 'Hotel',
              url: '/hotel',
            },
            {
              label: 'Habitaciones',
              url: 'hotel/habitaciones',
            },
            {
              label: 'Reservas',
              url: '',
            },
          ],
        },
      },
      {
        path: 'reservación',
        canActivate: [AdminGuard],
        component: ListRoomsComponent,
        data: {
          title: 'RESERVACIOBES',
          breadcrumb: [
            {
              label: 'Hotel',
              url: '/hotel',
            },
            {
              label: 'Reservaciones',
              url: 'hotel/reservaciones',
            },
            {
              label: 'Gestion',
              url: '',
            },
          ],
        },
      },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelierRoutingModule { }
