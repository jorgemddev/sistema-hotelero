import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FilePreviewModel,
  UploaderCaptions,
  ValidationError,
} from 'ngx-awesome-uploader';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, delay } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { ApiService } from 'src/app/services/api.service';
import { ImagePickerService } from 'src/app/services/image-picker.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
  providers:[UploadService]
})
export class UploadImageComponent implements OnInit {
  constructor(private http: HttpClient, private toast:ToastrService,   private api: ApiService,private helps:Helps) {}

  @Output()
  onSuccess = new EventEmitter<boolean>(false);

  public myFiles: FilePreviewModel[] = [];
  adapter = new ImagePickerService(this.http,this.api,this.helps);
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Arrastre y suelte aquí',
      or: 'ó',
      browse: 'Subir imagen desde directorio',
    },
    cropper: {
      crop: 'cortar',
      cancel: 'cancelar',
    },
    previewCard: {
      remove: 'Si',
      uploadError: 'Ocurrio un error al subir la imagen',
    },
  };

  ngOnInit(): void {}
  public onValidationError(error: ValidationError): void {
    console.log("Error");
    alert(`Validation Error ${error.error} in ${error.file.name}`);
  }

  public onUploadSuccess(e: FilePreviewModel): void {
    console.log("success image");
    console.log(e);
    console.log(this.myFiles);
    this.onSuccess.emit(true);
  }
  onUploadFail(e: any){
    console.log("fail image");
    console.log(e);
    this.toast.warning(e.error.mistakes,"Error al subir imagen");
  }
  public onRemoveSuccess(e: FilePreviewModel) {
    console.log("RemoveSuccess");
    console.log(e);
    this.onSuccess.emit(true);
  }
  public onFileAdded(file: FilePreviewModel) {
    console.log(" onFileAdded");
    this.myFiles.push(file);
  }

  public myCustomValidator(file: File): Observable<boolean> {
    if (!file.name.includes('uploader')) {
      return of(true).pipe(delay(2000));
    }

    return of(false).pipe(delay(2000));
  }

}
