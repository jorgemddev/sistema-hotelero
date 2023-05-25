import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _http:HttpClient) { 

  }
uploadImage(vals:any):Observable<any>{
  let data=vals
  return this._http.post(
   // 'https://api.cloudinary.com/v1_1/dfml5sr1w/image/upload',
    'http://apiweb.jsw/images/upload',
    data
  );
}
}
