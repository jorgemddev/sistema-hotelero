import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Responses } from '../models/interfaces/responses';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private domain =environment.baseApiUrl;

  private pollingInterval = 150000; // Intervalo de tiempo en milisegundos (en este ejemplo, 5 segundos)

  constructor(private http: HttpClient) { }

  getReservationsPolling(): Observable<Responses> {
    return interval(this.pollingInterval).pipe(
      switchMap(() => this.http.get<any>(`${this.domain}hotel/reservations/earring`))
    );
  }
}
