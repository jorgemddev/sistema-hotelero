import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FilePickerAdapter,
  FilePreviewModel,
  UploadResponse,
  UploadStatus,
} from 'ngx-awesome-uploader';
import { Observable, map, catchError, of } from 'rxjs';
import { ApiService } from './api.service';
import { Helps } from '../libs/helps';

@Injectable({
  providedIn: 'root',
})
export class ImagePickerService extends FilePickerAdapter {
  constructor(private http: HttpClient, private apiService: ApiService, private helps: Helps) {
    super();
  }
  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const form = new FormData();
    form.append('file', fileItem.file);
    const api =
      this.apiService.domain + 'company/images/upload/'
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
      'https://run.mocky.io/v3/dedf88ec-7ce8-429a-829b-bd2fc55352bc';
    return this.http.post(removeApi, { id });
  }
}
