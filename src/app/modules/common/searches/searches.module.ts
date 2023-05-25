import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsComponent } from './search-products/search-products.component';
import { NgFallimgModule } from 'ng-fallimg';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiSearchService } from './api-search.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryModule } from '../../inventory/inventory.module';



@NgModule({
  declarations: [
    SearchProductsComponent
  ],
  imports: [
    CommonModule,
    NgFallimgModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SearchProductsComponent
  ],
  providers: [
    ApiSearchService,
  ],
})
export class SearchesModule { }
