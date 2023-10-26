import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { FilePickerModule, FilePickerService } from 'ngx-awesome-uploader';
import { MyFilePickerService } from './my-file-picker.service';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FilePickerModule
  ],
  exports:[UploadFileComponent],
  providers:[
    FilePickerService,
   MyFilePickerService
  ]
})
export class UploadFileModule { }
