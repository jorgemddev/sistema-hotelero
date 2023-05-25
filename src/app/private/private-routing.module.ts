import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../models/guard/admin.guard';
import { InventoryComponent } from '../modules/inventory/inventory.component';
import { SettingComponent } from '../modules/setting/setting.component';
import { WebsiteComponent } from '../modules/website/website.component';
import { DashComponent } from './pages/dash/dash.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
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
    canActivate: [AdminGuard],
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
  //module website
  {
    path: 'sitio-web',
    component: WebsiteComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/website/website.module').then(
            (m2) => m2.WebsiteModule
          ),
      },
    ],
    data: {
      title: 'SITIO WEB',
      breadcrumb: [
        {
          label: 'Sitio web',
          url: '/sitio-web',
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
