import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/models/guard/admin.guard';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { ClientsComponent } from './clients/clients.component';



const routes: Routes = [
  {
    path: 'clientes',
    canActivate: [AdminGuard],
    component: ClientsComponent,
    data: {
      title: 'CLIENTES',
      breadcrumb: [
        {
          label: 'CRM',
          url: 'crm',
        },
        {
          label: 'clientes',
          url: '',
        },
      ],
    },
    children: [
      {
        path: 'gestion',
        canActivate: [AdminGuard],
        component: ListClientsComponent,
        data: {
          title: 'GESTIÓN CLIENTE',
          breadcrumb: [
            {
              label: 'CRM',
              url: '/crm',
            },
            {
              label: 'Clientes',
              url: '/crm/clientes',
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
        canActivate: [AdminGuard],
        component: EditClientComponent,
        data: {
          title: 'EDITAR CLIENTE',
          breadcrumb: [
            {
              label: 'CRM',
              url: '/crm',
            },
            {
              label: 'Clientes',
              url: '/crm/clientes',
            },
            {
              label: 'Editar',
              url: '',
            },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
