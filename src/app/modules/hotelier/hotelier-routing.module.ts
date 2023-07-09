import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/models/guard/admin.guard';
import { RoomsComponent } from './rooms/rooms.component';
import { ListRoomsComponent } from './rooms/list-rooms/list-rooms.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ClientsComponent } from './clients/clients.component';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { DetailRoomComponent } from './rooms/detail-room/detail-room.component';
import { CheckInComponent } from './reservations/check-in/check-in.component';
import { CheckOutComponent } from './reservations/check-out/check-out.component';
import { AuthGuard } from 'src/app/models/guard/auth.guard';
import { CashGuard } from 'src/app/models/guard/cash.guard';
const routes: Routes = [
  {
    path: 'habitaciones',
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
        canActivate:[CashGuard],
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
        }
      },
      {
        path: 'detalle/:id',
        canActivate:[CashGuard],
        component: DetailRoomComponent,
        data: {
          title: 'DETALLE',
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
              url: 'hotel/habitaciones/reservas',
            },
            {
              label: 'Detalle',
              url: '',
            },
          ],
        },
      },
      {
        path: 'check-in',
        canActivate:[CashGuard],
        component: CheckInComponent,
        data: {
          title: 'CHECK IN',
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
              url: 'hotel/habitaciones/reservas',
            },
            {
              label: 'Check-In',
              url: '',
            },
          ],
        },
      },
      {
        path: 'check-in/:id',
        canActivate:[CashGuard],
        component: CheckInComponent,
        data: {
          title: 'CHECK IN',
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
              url: 'hotel/habitaciones/reservas',
            },
            {
              label: 'Check-In',
              url: '',
            },
          ],
        },
      },
      {
        path: 'check-out/:id',
        canActivate:[CashGuard],
        component: CheckOutComponent,
        data: {
          title: 'CHECK OUT',
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
              url: 'hotel/habitaciones/reservas',
            },
            {
              label: 'Check-Out',
              url: '',
            },
          ],
        },
      },
      {
        path: 'gestion',
        canActivate: [AdminGuard],
        component: ListRoomsComponent,
        data: {
          title: 'HABITACIONES',
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
              label: 'Gestion',
              url: '',
            },
          ],
        },
      },
    ],

  },
  {
    path: 'clientes',
    component: ClientsComponent,
    data: {
      title: 'CLIENTES',
      breadcrumb: [
        {
          label: 'Hotel',
          url: 'hotel',
        },
        {
          label: 'Clientes',
          url: '',
        },
      ],
    },
    children: [
      {
        path: 'gestion',
        component: ListClientsComponent,
        data: {
          title: 'CLIENTES',
          breadcrumb: [
            {
              label: 'Hotel',
              url: '/hotel',
            },
            {
              label: 'Clientes',
              url: 'hotel/clientes',
            },
            {
              label: 'Gestion',
              url: '',
            },
          ],
        },
      },
      {
        path: 'editar/:id',
        component: EditClientComponent,
        data: {
          title: 'CLIENTES',
          breadcrumb: [
            {
              label: 'Hotel',
              url: '/hotel',
            },
            {
              label: 'Clientes',
              url: 'hotel/clientes',
            },
            {
              label: 'Gestion',
              url: 'hotel/clientes/gestion',
            },
            {
              label: 'Editar',
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
