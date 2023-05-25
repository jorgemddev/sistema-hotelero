import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/models/guard/admin.guard';
import { BlogComponent } from './blog/blog.component';
import { AddCategoryComponent } from './blog/categorys/add-category/add-category.component';
import { EditCategoryComponent } from './blog/categorys/edit-category/edit-category.component';
import { ListCategoryComponent } from './blog/categorys/list-category/list-category.component';
import { AddNewsComponent } from './blog/news/add-news/add-news.component';
import { ListNewsComponent } from './blog/news/list-news/list-news.component';
import { ConfigComponent } from './config/config.component';
import { NavsComponent } from './config/navs/navs.component';
import { AddWebPageComponent } from './content/add-web-page/add-web-page.component';
import { ContentComponent } from './content/content.component';
import { EditWebPageComponent } from './content/edit-web-page/edit-web-page.component';
import { ListWebPageComponent } from './content/list-web-page/list-web-page.component';
import { AddExtensionsComponent } from './extensions/add-extensions/add-extensions.component';
import { EditExtensionsComponent } from './extensions/edit-extensions/edit-extensions.component';
import { ExtensionsComponent } from './extensions/extensions.component';
import { ListExtensionsComponent } from './extensions/list-extensions/list-extensions.component';


const routes: Routes = [
  {
    path: 'contenido',
    canActivate: [AdminGuard],
    component: ContentComponent,
    children: [
      {
        path: 'agregar',
        canActivate: [AdminGuard],
        component: AddWebPageComponent,
        data: {
          title: 'PAGINAS',
          breadcrumb: [
            {
              label: 'Sitio web',
              url: '/sitio-web',
            },
            {
              label: 'Contenido',
              url: 'sitio-web/contenido',
            },
            {
              label: 'Listar',
              url: 'sitio-web/contenido/listar',
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
        component: ListWebPageComponent,
        data: {
          title: 'LISTAR',
          breadcrumb: [
            {
              label: 'Sitio web',
              url: '/sitio-web',
            },
            {
              label: 'Contenido',
              url: 'sitio-web/contenido',
            },
            {
              label: 'Listar',
              url: 'sitio-web/contenido/listar',
            },
          ],
        },
      },
      {
        path: 'editar/:id',
        canActivate: [AdminGuard],
        component: EditWebPageComponent,
        data: {
          title: 'EDITAR',
          breadcrumb: [
            {
              label: 'Sitio web',
              url: '/sitio-web',
            },
            {
              label: 'Contenido',
              url: 'sitio-web/contenido',
            },
            {
              label: 'Listar',
              url: 'sitio-web/contenido/listar',
            },
            {
              label: 'Editar',
              url: '',
            },
          ],
        },
      },
    ],
    data: {
      title: 'CONTENIDO',
      breadcrumb: [
        {
          label: 'Sitio web',
          url: 'sitio-web',
        },
        {
          label: 'Contenido',
          url: '',
        },
      ],
    },
  },

  {
    path: 'noticias',
    canActivate: [AdminGuard],
    component: BlogComponent,
    children: [
      {
        path: 'agregar',
        canActivate: [AdminGuard],
        component: AddNewsComponent,
        data: {
          title: 'NOTICIAS',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Noticias',
              url: 'sitio-web/noticias',
            },
            {
              label: 'Listar',
              url: 'sitio-web/noticias/listar',
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
        component: ListNewsComponent,
        data: {
          title: 'LISTAR',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Noticias',
              url: 'sitio-web/noticias',
            },
            {
              label: 'Listar',
              url: 'sitio-web/noticias/listar',
            },
          ],
        },
      },
      {
        path: 'editar/:id',
        canActivate: [AdminGuard],
        component: EditWebPageComponent,
        data: {
          title: 'EDITAR',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Noticias',
              url: 'sitio-web/noticias',
            },
            {
              label: 'Listar',
              url: 'sitio-web/noticias/listar',
            },
            {
              label: 'Editar',
              url: '',
            },
          ],
        },
      },
      {
        path: 'categorias/agregar',
        canActivate: [AdminGuard],
        component: ListCategoryComponent,
        data: {
          title: 'CATEGORIA',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Noticias',
              url: 'sitio-web/noticias',
            },
            {
              label: 'Categorias',
              url: 'sitio-web/noticias/categorias',
            },
            {
              label: 'Agregar categoria',
              url: '',
            },
          ],
        },
      },
      {
        path: 'categorias',
        canActivate: [AdminGuard],
        component: ListCategoryComponent,
        data: {
          title: 'LISTAR CATEGORIAS',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Noticias',
              url: 'sitio-web/noticias',
            },
            {
              label: 'Categorias',
              url: '',
            },
          ],
        },
      },
      {
        path: 'categorias/:action/:id',
        canActivate: [AdminGuard],
        component: ListCategoryComponent,
        data: {
          title: 'EDITAR',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Noticias',
              url: 'sitio-web/noticias',
            },
            {
              label: 'Categorias',
              url: 'sitio-web/noticias/categorias',
            },
            {
              label: 'Editar',
              url: '',
            },
          ],
        },
      },
    ],
    data: {
      title: 'NOTICIAS',
      breadcrumb: [
        {
          label: 'Sitio web',
          url: 'sitio-web',
        },
        {
          label: 'Noticias',
          url: '',
        },
      ],
    },
  },
  {
    path: 'complementos',
    canActivate: [AdminGuard],
    component: ExtensionsComponent,
    children: [
      {
        path: 'agregar',
        canActivate: [AdminGuard],
        component: AddExtensionsComponent,
        data: {
          title: 'COMPLEMENTO',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Complementos',
              url: 'sitio-web/complementos',
            },
            {
              label: 'Listar',
              url: 'sitio-web/complementos/listar',
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
        component: ListExtensionsComponent,
        data: {
          title: 'LISTAR',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Complementos',
              url: 'sitio-web/complementos',
            },
            {
              label: 'Listar',
              url: 'sitio-web/complementos/listar',
            },
          ],
        },
      },
    ],
    data: {
      title: 'COMPLEMENTOS',
      breadcrumb: [
        {
          label: 'Sitio web',
          url: 'sitio-web',
        },
        {
          label: 'Complementos',
          url: '',
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
        path: 'menus',
        canActivate: [AdminGuard],
        component: NavsComponent,
        data: {
          title: 'LISTAR',
          breadcrumb: [
            {
              label: 'sitio-web',
              url: '/sitio-web',
            },
            {
              label: 'Ajustes',
              url: 'sitio-web/ajustes',
            },
            {
              label: 'Menus',
              url: 'sitio-web/ajustes/menus',
            },
          ],
        },
      },
    ],
    data: {
      title: 'AJUSTES',
      breadcrumb: [
        {
          label: 'Sitio web',
          url: 'sitio-web',
        },
        {
          label: 'Ajustes',
          url: '',
        },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
