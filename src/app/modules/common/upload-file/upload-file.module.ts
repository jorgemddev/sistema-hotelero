import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { FilePickerModule, FilePickerService } from 'ngx-awesome-uploader';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MyFilePickerService } from './my-file-picker.service';



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
