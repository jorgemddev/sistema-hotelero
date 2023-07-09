import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responses } from 'src/app/models/interfaces/responses';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiEditorHtmlService {
  public domain: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

}
