import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/models/guard/admin.guard';
import { FormatsComponent } from './formats/formats.component';
import { ListProductComponent } from './products/management/list-product/list-product.component';
import { ListMovementsComponent } from './products/movements/list-movements/list-movements.component';
import { ProductComponent } from './products/products.component';
import { ProductBrandsComponent } from './products/setting/product-brands/product-brands.component';
import { ProductFamilyComponent } from './products/setting/product-family/product-family.component';
import { EditProviderComponent } from './providers/provider/edit-provider/edit-provider.component';
import { ListProviderComponent } from './providers/provider/list-provider/list-provider.component';
import { ProvidersComponent } from './providers/providers.component';
import { EditPurchaseOrderComponent } from './providers/purchase-order/edit-purchase-order/edit-purchase-order.component';
import { ListPurchaseOrderComponent } from './providers/purchase-order/list-purchase-order/list-purchase-order.component';
import { AddMovementsComponent } from './products/movements/add-movements/add-movements.component';


const routes: Routes = [
  {
    path: 'productos',
    canActivate: [AdminGuard],
    component: ProductComponent,
    data: {
      title: 'PRODUCTOS',
      breadcrumb: [
        {
          label: 'Inventario',
          url: 'inventario',
        },
        {
          label: 'Productos',
          url: '',
        },
      ],
    },
    children: [
      {
        path: 'gestion',
        canActivate: [AdminGuard],
        component: ListProductComponent,
        data: {
          title: 'PRODUCTOS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Gestion',
              url: '',
            },
          ],
        },
      },
      {
        path: 'movimientos',
        canActivate: [AdminGuard],
        component: ListMovementsComponent,
        data: {
          title: 'MOVIMIENTOS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Movimientos',
              url: '',
            },
          ],
        },
      },
      {
        path: 'movimiento',
        canActivate: [AdminGuard],
        component: AddMovementsComponent,
        data: {
          title: 'GENERAR MOVIMIENTO',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Movimientos',
              url: 'inventario/productos/movimientos',
            },
            {
              label: 'Traspaso',
              url: '',
            },
          ],
        },
      },
      {
        path: 'marcas',
        canActivate: [AdminGuard],
        component: ProductBrandsComponent,
        data: {
          title: 'MARCAS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Marcas',
              url: '',
            },
          ],
        },
      },
      {
        path: 'familias',
        canActivate: [AdminGuard],
        component: ProductFamilyComponent,
        data: {
          title: 'MARCAS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Familias',
              url: '',
            },
          ],
        },
      },
      {
        path: 'familias/:editar/:id',
        canActivate: [AdminGuard],
        component: ProductFamilyComponent,
        data: {
          title: 'MARCAS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Familias',
              url: 'inventario/productos/familias',
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
  {
    path: 'formatos',
    canActivate: [AdminGuard],
    component: FormatsComponent,
    children: [
      {
        path: 'gestion',
        canActivate: [AdminGuard],
        component: ListProductComponent,
        data: {
          title: 'PRODUCTOS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Gestion',
              url: '',
            },
          ],
        },
      },
      {
        path: 'movimientos',
        canActivate: [AdminGuard],
        component: ListMovementsComponent,
        data: {
          title: 'MOVIMIENTOS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Movimientos',
              url: '',
            },
          ],
        },
      },
      {
        path: 'marcas',
        canActivate: [AdminGuard],
        component: ProductBrandsComponent,
        data: {
          title: 'MARCAS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Marcas',
              url: '',
            },
          ],
        },
      },
      {
        path: 'marcas/:editar/:id',
        canActivate: [AdminGuard],
        component: ProductBrandsComponent,
        data: {
          title: 'MARCAS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Marcas',
              url: 'inventario/productos/marcas',
            },
            {
              label: 'Editar',
              url: '',
            },
          ],
        },
      },
      {
        path: 'familias',
        canActivate: [AdminGuard],
        component: ProductFamilyComponent,
        data: {
          title: 'MARCAS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Familias',
              url: '',
            },
          ],
        },
      },
      {
        path: 'familias/:editar/:id',
        canActivate: [AdminGuard],
        component: ProductFamilyComponent,
        data: {
          title: 'MARCAS',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Productos',
              url: 'inventario/productos',
            },
            {
              label: 'Familias',
              url: 'inventario/productos/familias',
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
      title: 'FORMATOS',
      breadcrumb: [
        {
          label: 'Inventario',
          url: 'inventario',
        },
        {
          label: 'Formatos',
          url: '',
        },
      ],
    },
  },
  {
    path: 'proveedores',
    canActivate: [AdminGuard],
    component: ProvidersComponent,
    children: [
      {
        path: 'gestion',
        canActivate: [AdminGuard],
        component: ListProviderComponent,
        data: {
          title: 'PROVEEDORES',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Proveedores',
              url: 'inventario/proveedores',
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
        component: EditProviderComponent,
        data: {
          title: 'PROVEEDORES',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Proveedores',
              url: 'inventario/proveedores',
            },
            {
              label: 'Gestion',
              url: 'inventario/proveedores/gestion',
            },
            {
              label: 'Editar',
              url: '',
            },
          ],
        },
      },
      {
        path: 'ordenes-de-compra',
        canActivate: [AdminGuard],
        component: ListPurchaseOrderComponent,
        data: {
          title: 'ORDENES DE COMPRA',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Proveedores',
              url: 'inventario/proveedores',
            },
            {
              label: 'Ordenes de compra',
              url: '',
            },
          ],
        },
      },
      {
        path: 'ordenes-de-compra/:editar/:id',
        canActivate: [AdminGuard],
        component: EditPurchaseOrderComponent,
        data: {
          title: 'ORDENES DE COMPRA',
          breadcrumb: [
            {
              label: 'Inventario',
              url: '/inventario',
            },
            {
              label: 'Proveedores',
              url: 'inventario/proveedores',
            },
            {
              label: 'Ordenes de compra',
              url: 'inventario/proveedores/ordenes-de-compra',
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
      title: 'PROVEEDORES',
      breadcrumb: [
        {
          label: 'Inventario',
          url: 'inventario',
        },
        {
          label: 'Proveedores',
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
export class InventoryRoutingModule { }
