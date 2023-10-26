import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePickerModule, FilePickerService } from 'ngx-awesome-uploader';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { UploadTemplateComponent } from './upload-template.component';
import { MyTemplatePickerService } from './my-template-picker.service';



@NgModule({
  declarations: [
    UploadTemplateComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FilePickerModule
  ],
  exports: [UploadTemplateComponent],
  providers: [
    FilePickerService,
    MyTemplatePickerService
  ]
})
export class UploadTemplateModule { }
