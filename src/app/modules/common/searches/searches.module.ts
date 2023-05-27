import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsComponent } from './search-products/search-products.component';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiSearchService } from './api-search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryModule } from '../../inventory/inventory.module';
import { ToolbarSearchComponent } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { ImageDefaultConfig, ImageDefaultModule } from '../image-default/image-default.module';

const imageConfig: ImageDefaultConfig = {
  defaultImages: {
    default: 'assets/images/default.jpg',
  },
};

@NgModule({
  declarations: [
    SearchProductsComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarSearchComponent,
    ImageDefaultModule.forRoot(imageConfig)
  ],
  exports:[
    SearchProductsComponent
  ],
  providers: [
    ApiSearchService,
  ],
})
export class SearchesModule { }
