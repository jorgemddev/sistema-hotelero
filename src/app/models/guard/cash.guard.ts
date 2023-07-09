import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { ApiService } from 'src/app/services/api.service';
import { CashService } from 'src/app/services/cash.service';

@Injectable({
  providedIn: 'root'
})
export class CashGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router, private helps: Helps,  private cashService: CashService) {}

  canActivate(): Observable<boolean> {
    return this.api.isLogged().pipe(
      map((response) => {
        // Comprueba si el usuario ha iniciado sesión en la caja
        if (response.hasStartedCash) {
            console.error("CashGuard Si inicio caja");
          return true; // Permite al usuario interactuar
        } else {
            console.error("CashGuard no inicio caja");
        }
      }),
      catchError((error) => {
        console.error("CashGuard ->", error);
        return of(false);
      })
    );
  }
}
