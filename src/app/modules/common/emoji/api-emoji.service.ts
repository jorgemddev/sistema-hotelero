import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responses } from 'src/app/models/interfaces/responses';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiEmojiService {

  public domain: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }
  
  searchEmoji(q: string): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/emoji/search/' + q
    );
  }
  getGroupEmoji(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/emoji/group/'
    );
  }
  getAllEmojis(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/emoji/'
    );
  }
  
}
