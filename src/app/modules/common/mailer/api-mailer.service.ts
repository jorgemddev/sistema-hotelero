import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Responses } from 'src/app/models/interfaces/responses';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiMailerService {
  public domain: string = environment.baseApiUrl;
  private controller:string="extensions/mailer";
  constructor(private http: HttpClient) { }
  send(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + this.controller+'/send/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  sendPaymentLink(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + this.controller+'/paymentLink/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  getModuleTemplates(modules_id: number=0): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain +this.controller+ '/modules/' + modules_id
    );
  }
  getTemplates(template_id: number=0): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain +this.controller+ '/templates/' + template_id
    );
  }
}