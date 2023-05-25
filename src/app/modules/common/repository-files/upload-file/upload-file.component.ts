import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilePreviewModel, UploaderCaptions, ValidationError } from 'ngx-awesome-uploader';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { FilePickerService } from 'src/app/services/file-picker.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  constructor(private http: HttpClient, private toast:ToastrService,   private api: ApiService) {}

  @Output()
  onSuccess = new EventEmitter<boolean>(false);

  public myFiles: FilePreviewModel[] = [];
  adapter = new FilePickerService(this.http,this.api);
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Arrastre y suelte aquí',
      or: 'ó',
      browse: 'Subir archivo desde directorio',
    },
    cropper: {
      crop: 'cortar',
      cancel: 'cancelar',
    },
    previewCard: {
      remove: 'Si',
      uploadError: 'Ocurrio un error al subir el archivo',
    },
  };

  ngOnInit(): void {}
  public onValidationError(error: ValidationError): void {
    console.log("Error");
    alert(`Validation Error ${error.error} in ${error.file.name}`);
  }

  public onUploadSuccess(e: FilePreviewModel): void {
    console.log("success file");
    console.log(e);
    console.log(this.myFiles);
    this.onSuccess.emit(true);
  }
  onUploadFail(e: any){
    console.log("fail file");
    console.log(e);
    this.toast.warning(e.error.mistakes[0],e.error.msg);
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
