import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Responses } from 'src/app/models/interfaces/responses';
import { RequestsService } from 'src/app/services/requests.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {
  public domain: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private request: RequestsService) { }


  searchProducts(q:string, category,page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/index/search/' +q+'/'+category+'/'+page+'/'+this.getUrlTknUid()
    );
  }

  getUrlTknUid(): String {
    var uid = sessionStorage.getItem('ccviUid');
    var token = sessionStorage.getItem('ccviTkn');
    var url: String = '?uid=' + uid + '&token=' + token;
    return url;
  }
}
