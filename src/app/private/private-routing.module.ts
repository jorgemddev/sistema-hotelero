import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from '../modules/inventory/inventory.component';
import { DashComponent } from './pages/dash/dash.component';
import { AdminGuard } from '../models/guard/admin.guard';
import { CrmComponent } from '../modules/crm/crm.component';
import { SettingComponent } from '../modules/setting/setting.component';



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
  //module clients
  {
    path: 'crm',
    component: CrmComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/crm/crm.module').then(
            (m3) => m3.CrmModule
          ),
      },
    ],
    data: {
      title: 'CLIENTES',
      breadcrumb: [
        {
          label: 'Clientes',
          url: '/clientes',
        },
      ],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule { }
