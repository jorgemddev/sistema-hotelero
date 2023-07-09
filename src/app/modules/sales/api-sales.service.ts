import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Responses } from 'src/app/models/interfaces/responses';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiSalesService {
  getMovements() {
    return this.http.get<Responses>(
      this.domain + this.controller + '/index/movements/'
    );
  }

  public domain: string = environment.baseApiUrl;
  private controller: string = "pos/";
  constructor(private http: HttpClient) { }
  
  initBox(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + this.controller + 'index/init/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  closeBox(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + this.controller + 'index/close/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  validateTransaction(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + this.controller + 'index/validate/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  addMoney(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + this.controller + 'index/add/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  removeMoney(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + this.controller + 'index/remove/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  status(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + this.controller + '/index/'
    );
  }
}
