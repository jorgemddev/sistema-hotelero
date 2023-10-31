import { HttpClient, HttpParams, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Responses } from 'src/app/models/interfaces/responses';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {
  public domain: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }


  searchProducts(q:string, category,page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/index/search/' +q+'/'+category+'/'+page+'/'
    );
  }
  searchProductsCode(q:string): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/index/code/' +q
    );
  }

}
