import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { Responses } from 'src/app/models/interfaces/responses';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiSharedService {
  public domain: string = environment.baseApiUrl;
  constructor(private http: HttpClient,private helps:Helps) { }
  getCodPhones(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/cphone/'
    );
  }
}
