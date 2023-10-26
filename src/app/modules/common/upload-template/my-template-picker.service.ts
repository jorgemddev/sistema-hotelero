import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { end } from '@popperjs/core';
import {
  FilePickerAdapter,
  FilePreviewModel,
  UploadResponse,
  UploadStatus,
} from 'ngx-awesome-uploader';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MyTemplatePickerService extends FilePickerAdapter {
  constructor(private http: HttpClient) {
    super();
  }



  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const form = new FormData();
    form.append('file', fileItem.file);
    const api =
      environment?.baseApiUrl + 'company/template/upload/';
    const req = new HttpRequest('POST', api, form, { reportProgress: true });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          const responseFromBackend = res.body;
          return {
            body: responseFromBackend,
            status: UploadStatus.UPLOADED,
          };
        } else if (res.type === HttpEventType.UploadProgress) {
          const uploadProgress = +Math.round((100 * res.loaded) / res.total);
          return {
            status: UploadStatus.IN_PROGRESS,
            progress: uploadProgress,
          };
        }
      }),
      catchError((er) => {
        console.log(er);
        return of({ status: UploadStatus.ERROR, body: er });
      })
    );
  }

  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    const id = 50;
    const responseFromBackend = fileItem.uploadResponse;
    console.log(fileItem);
    const removeApi =
      '';
    return this.http.post(removeApi, { id });
  }
}
