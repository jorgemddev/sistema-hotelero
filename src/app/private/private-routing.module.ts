import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from '../modules/inventory/inventory.component';
import { SettingComponent } from '../modules/setting/setting.component';
import { DashComponent } from './pages/dash/dash.component';

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
            (m3) => m3.InventoryModule
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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
