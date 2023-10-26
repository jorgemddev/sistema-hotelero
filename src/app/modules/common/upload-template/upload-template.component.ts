import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FilePreviewModel, UploaderCaptions, ValidationError } from 'ngx-awesome-uploader';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyTemplatePickerService } from './my-template-picker.service';
import { Files } from 'src/app/models/interfaces/Files';

@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css']
})
export class UploadTemplateComponent  {

  constructor(private http: HttpClient, private toast: ToastrService, private api: ApiService, private modal: NgbModal) {

  }


  @Output()
  onSuccess = new EventEmitter<Files>(false);

  @Input()
  pathTemplate: string;


  public myFiles: FilePreviewModel[] = [];
  adapter = new MyTemplatePickerService(this.http);
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

  public onValidationError(error: ValidationError): void {
    this.toast.warning("El archivo seleccionado no es valido");
  }

  public onUploadSuccess(e: FilePreviewModel): void {
    console.log("success file");
    console.log(e);
    console.log(this.myFiles);
    this.toast.success("Archivo subido correctamente");
    this.onSuccess.emit(e.uploadResponse.data);
  }
  onUploadFail(e: any) {
    console.log("fail file");
    console.log(e.error);
    this.toast.warning(e.error.mistakes, e.error.msg);
  }
  public onRemoveSuccess(e: FilePreviewModel) {
    console.log("RemoveSuccess");
    console.log(e);
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
  downloadTemplate(): void {
    // Ruta relativa de la plantilla Excel en la carpeta "assets"
    var templateUrl = 'assets/carga_empleados.xlsx';
    if (this.pathTemplate) {
      templateUrl = this.pathTemplate + '.xlsx';
    }


    // Abrir una nueva ventana para descargar la plantilla
    window.open(templateUrl, '_blank');
  }
}
