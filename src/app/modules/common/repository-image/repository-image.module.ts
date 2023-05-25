import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryImageComponent } from './repository-image.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FilePickerModule } from 'ngx-awesome-uploader';




@NgModule({
  declarations: [
    RepositoryImageComponent,
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FilePickerModule
  ],
  exports:[
    RepositoryImageComponent
  ]
})
export class RepositoryImageModule { }
