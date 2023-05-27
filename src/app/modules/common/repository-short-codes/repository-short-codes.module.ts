import { EventEmitter, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryShortCodesComponent } from './repository-short-codes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewModule1Component } from './module-1/view-module-1/view-module-1.component';
import { GalleryIconsModule } from '../gallery-icons/gallery-icons.module';
import { RepositoryImageModule } from '../repository-image/repository-image.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  declarations: [
    RepositoryShortCodesComponent,
    ViewModule1Component
  ],
  imports: [
    CommonModule,
    GalleryIconsModule,
    RepositoryImageModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule,
  ],
  exports:[
    RepositoryShortCodesComponent,
    ViewModule1Component
  ]
})
export class RepositoryShortCodesModule { 
  constructor(private modal:NgbModal) { }
  @Output()
  onSelected = new EventEmitter<string>();

  selected(code: any) {
    this.onSelected.emit('[bcode '+code+']');    
  }
  openModal(md: any) {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
