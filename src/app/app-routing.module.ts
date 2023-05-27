import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';
import { AuthGuard } from './models/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component:PrivateComponent,
    children: [
      {
        path: '',
        canActivate:[AuthGuard],
        loadChildren: () =>
          import('./private/private.module').then((m1) => m1.PrivateModule),
      },
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./public/public.module').then((m2) => m2.PublicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
