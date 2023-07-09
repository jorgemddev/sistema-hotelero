import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from '../modules/inventory/inventory.component';
import { SettingComponent } from '../modules/setting/setting.component';
import { DashComponent } from './pages/dash/dash.component';
import { HotelierComponent } from '../modules/hotelier/hotelier.component';
import { AdminGuard } from '../models/guard/admin.guard';
import { SalesComponent } from '../modules/sales/sales.component';


const routes: Routes = [
  {
    path: '',
    component: DashComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '',
        },
      ],
    },
  },
  {
    path: 'dash',
    component: DashComponent,
    data: {
      title: 'Home',
      breadcrumb: [
        {
          label: 'Home',
          url: '',
        },
      ],
    },
  },
  //module setting
  {
    path: 'configuracion',
    component: SettingComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/setting/setting.module').then(
            (m1) => m1.SettingModule
          ),
      },
    ],
    data: {
      title: 'CONFIGURACIÓN',
      breadcrumb: [
        {
          label: 'General',
          url: '/configuracion',
        },
      ],
    },
  },
  //module inventary
  {
    path: 'inventario',
    component: InventoryComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/inventory/inventory.module').then(
            (m2) => m2.InventoryModule
          ),
      },
    ],
    data: {
      title: 'INVENTARIO',
      breadcrumb: [
        {
          label: 'Inventario',
          url: '/inventario',
        },
      ],
    },
  },
  //module hotelier
  {
    path: 'hotel',
    component: HotelierComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/hotelier/hotelier.module').then(
            (m3) => m3.HotelierModule
          ),
      },
    ],
    data: {
      title: 'HOTEL',
      breadcrumb: [
        {
          label: 'Hotel',
          url: '/hotel',
        },
      ],
    },
  },
  {
    path: 'ventas',
    component: SalesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/sales/sales.module').then(
            (m4) => m4.SalesModule
          ),
      },
    ],
    data: {
      title: 'VENTAS',
      breadcrumb: [
        {
          label: 'Ventas',
          url: '/ventas',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule { }
