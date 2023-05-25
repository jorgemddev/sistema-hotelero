import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryFilesComponent } from './repository-files.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    RepositoryFilesComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FilePickerModule
  ]
})
export class RepositoryFilesModule { }
