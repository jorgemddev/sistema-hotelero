import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/models/guard/admin.guard';
import { CashGuard } from 'src/app/models/guard/cash.guard';
import { PosInitComponent } from './pos/pos-init/pos-init.component';

const routes: Routes = [
  {
    path: 'iniciar',
    component: PosInitComponent,
    data: {
      title: 'INICIAR CAJA',
      breadcrumb: [
        {
          label: 'Ventas',
          url: 'ventas',
        },
        {
          label: 'Inicio',
          url: '',
        },
      ],
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
