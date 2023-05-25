import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryIconsComponent } from './gallery-icons.component';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';



@NgModule({
  declarations: [
    GalleryIconsComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    ColorPickerModule
  ],
  exports:[
    GalleryIconsComponent
  ]
})
export class GalleryIconsModule { }
