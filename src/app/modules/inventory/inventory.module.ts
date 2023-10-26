import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './products/products.component';
import { AddProductComponent } from './products/management/add-product/add-product.component';
import { NgbModule, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListMovementsComponent } from './products/movements/list-movements/list-movements.component';
import { ListProductComponent } from './products/management/list-product/list-product.component';
import { EditProductComponent } from './products/management/edit-product/edit-product.component';
import { ProductFamilyComponent } from './products/setting/product-family/product-family.component';
import { FormatsComponent } from './formats/formats.component';
import { ProvidersComponent } from './providers/providers.component';
import { ListProviderComponent } from './providers/provider/list-provider/list-provider.component';
import { AddProviderComponent } from './providers/provider/add-provider/add-provider.component';
import { EditProviderComponent } from './providers/provider/edit-provider/edit-provider.component';
import { AddPurchaseOrderComponent } from './providers/purchase-order/add-purchase-order/add-purchase-order.component';
import { EditPurchaseOrderComponent } from './providers/purchase-order/edit-purchase-order/edit-purchase-order.component';
import { ListPurchaseOrderComponent } from './providers/purchase-order/list-purchase-order/list-purchase-order.component';
import { RepositoryImageModule } from '../common/repository-image/repository-image.module';
import { GeneratorSkuComponent } from './products/management/generator-sku/generator-sku.component';
import { NotesModule } from '../common/notes/notes.module';
import { ContactsModule } from '../common/contacts/contacts.module';
import { EditorHtmlModule } from '../common/editor-html/editor-html.module';
import { SearchesModule } from '../common/searches/searches.module';
import { SharedsModule } from '../common/shareds/shareds.module';
import { ToolbarSearchComponent } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { ProductBrandsComponent } from './products/setting/product-brands/product-brands.component';
import { ImageDefaultConfig, ImageDefaultModule } from '../../directives/image-default/image-default.module';
import { UploadFileModule } from '../common/upload-file/upload-file.module';
import { AddMovementsComponent } from './products/movements/add-movements/add-movements.component';
import { UpperCaseDirective } from 'src/app/directives/Uppercase-directive';
import { TitleCaseDirective } from 'src/app/directives/Titlecase-directive';
import { BackButtonComponent } from 'src/app/components/standalone/back-button/back-button.component';
import { UploadTemplateComponent } from '../common/upload-template/upload-template.component';
import { UploadTemplateModule } from '../common/upload-template/upload-template.module';
import { CrmModule } from '../crm/crm.module';
import { SettingModule } from '../setting/setting.module';
import { AddBrandComponent } from './products/setting/product-brands/add-brand/add-brand.component';
import { EditBrandComponent } from './products/setting/product-brands/edit-brand/edit-brand.component';
import { EditModelComponent } from './products/setting/product-brands/edit-model/edit-model.component';
import { AddModelComponent } from './products/setting/product-brands/add-model/add-model.component';
const imageConfig: ImageDefaultConfig = {
  defaultImages: {
    default: 'assets/images/default.jpg',
  },
};
@NgModule({
  declarations: [
    InventoryComponent,
    ProductComponent,
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
    ListMovementsComponent,
    ProductBrandsComponent,
    ProductFamilyComponent,
    AddBrandComponent,
    FormatsComponent,
    ProvidersComponent,
    ListProviderComponent,
    AddProviderComponent,
    EditProviderComponent,
    AddPurchaseOrderComponent,
    EditPurchaseOrderComponent,
    ListPurchaseOrderComponent,
    GeneratorSkuComponent,
    AddMovementsComponent,
    UpperCaseDirective,
    TitleCaseDirective,
    EditBrandComponent,
    EditModelComponent,
    AddModelComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbModule,
    RepositoryImageModule,
    NotesModule,
    SharedsModule,
    ContactsModule,
    EditorHtmlModule,
    SearchesModule,
    SharedsModule,
    UploadFileModule,
    SettingModule,
    CrmModule,
    ToolbarSearchComponent,
    BackButtonComponent,
    ImageDefaultModule.forRoot(imageConfig)

  ],
  exports: [InventoryComponent],
})
export class InventoryModule { }
