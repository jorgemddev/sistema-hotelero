import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/models/guard/admin.guard';

import { BrandComponent } from './company/brand/brand.component';
import { CompanyComponent } from './company/company.component';
import { MultimediaComponent } from './company/multimedia/multimedia.component';
import { SocialMediaComponent } from './company/social-media/social-media.component';
import { ConfigEmailComponent } from './config/config-email/config-email.component';
import { ConfigComponent } from './config/config.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListtUserComponent } from './users/list-user/list-user.component';
import { ProfileComponent } from './users/profile/profile.component';

import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'empresa',
    canActivate: [AdminGuard],
    component: CompanyComponent,
    children: [
      {
        path: 'general',
        canActivate: [AdminGuard],
        component: BrandComponent,
        data: {
          title: 'GENERAL',
          breadcrumb: [
            {
              label: 'General',
              url: '/configuracion',
            },
            {
              label: 'Empresa',
              url: 'configuracion/empresa',
            },
            {
              label: 'Información',
              url: '',
            },
          ],
        },
      },
      {
        path: 'multimedia',
        canActivate: [AdminGuard],
        component: MultimediaComponent,
        data: {
          title: 'MULTIMEDIA',
          breadcrumb: [
            {
              label: 'General',
              url: '/configuracion',
            },
            {
              label: 'Empresa',
              url: 'configuracion/empresa',
            },
            {
              label: 'Multimedia',
              url: '',
            },
          ],
        },
      },
      {
        path: 'social-media',
        canActivate: [AdminGuard],
        component: SocialMediaComponent,
        data: {
          title: 'SOCIAL MEDIA',
          breadcrumb: [
            {
              label: 'General',
              url: '/configuracion',
            },
            {
              label: 'Empresa',
              url: 'configuracion/empresa',
            },
            {
              label: 'Social Media',
              url: '',
            },
          ],
        },
      },
    ],
    data: {
      title: 'CONFIGURACIÓN',
      breadcrumb: [
        {
          label: 'General',
          url: 'configuracion',
        },
        {
          label: 'Empresa',
          url: '',
        },
      ],
    },
  },

  {
    path: 'colaboradores',
    canActivate: [AdminGuard],
    component: UsersComponent,
    children: [
      {
        path: 'agregar',
        canActivate: [AdminGuard],
        component: AddUserComponent,
        data: {
          title: 'USUARIOS',
          breadcrumb: [
            {
              label: 'General',
              url: '/configuracion',
            },
            {
              label: 'Colaboradores',
              url: 'configuracion/colaboradores',
            },
            {
              label: 'Listar',
              url: 'configuracion/colaboradores/listar',
            },
            {
              label: 'Agregar',
              url: '',
            },
          ],
        },
      },
      {
        path: 'listar',
        canActivate: [AdminGuard],
        component: ListtUserComponent,
        data: {
          title: 'LISTAR',
          breadcrumb: [
            {
              label: 'General',
              url: '/configuracion',
            },
            {
              label: 'Colaboradores',
              url: 'configuracion/colaboradores',
            },
            {
              label: 'Listar',
              url: '',
            },
          ],
        },
      },
      {
        path: 'editar/:id',
        canActivate: [AdminGuard],
        component: EditUserComponent,
        data: {
          title: 'EDITAR',
          breadcrumb: [
            {
              label: 'General',
              url: '/configuracion',
            },
            {
              label: 'Colaboradores',
              url: 'configuracion/colaboradores',
            },
            {
              label: 'Listar',
              url: 'configuracion/colaboradores/listar',
            },
            {
              label: 'Editar',
              url: '',
            },
          ],
        },
      },
      {
        path: 'perfil',
        canActivate: [AdminGuard],
        component: ProfileComponent,
        data: {
          title: 'PERFIL',
          breadcrumb: [
            {
              label: 'General',
              url: '/configuracion',
            },
            {
              label: 'Colaboradores',
              url: 'configuracion/colaboradores',
            },
            {
              label: 'Mi perfil',
              url: '',
            },
          ],
        },
      },
    ],
    data: {
      title: 'CONFIGURACIÓN',
      breadcrumb: [
        {
          label: 'General',
          url: 'configuracion',
        },
        {
          label: 'Colaboradores',
          url: '/configuracion/colaboradores',
        },
      ],
    },
  },
  {
    path: 'ajustes',
    canActivate: [AdminGuard],
    component: ConfigComponent,
    children: [
      {
        path: 'email',
        canActivate: [AdminGuard],
        component: ConfigEmailComponent,
        data: {
          title: 'EMAIL',
          breadcrumb: [
            {
              label: 'General',
              url: 'configuracion',
            },
            {
              label: 'Ajustes',
              url: 'configuracion/ajustes',
            },
            {
              label: 'Servidores de correo',
              url: '',
            },
          ],
        },
      },
    ],
    data: {
      title: 'AJUSTES',
      breadcrumb: [
        {
          label: 'General',
          url: 'configuracion',
        },
        {
          label: 'Ajustes',
          url: '/configuracion/ajustes',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
