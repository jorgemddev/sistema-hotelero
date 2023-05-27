import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { ApiService } from 'src/app/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private api: ApiService, private router: Router, private helps: Helps) { }

  canActivate(): Observable<boolean> {
    return this.api.isLogged().pipe(
      map((response) => {
        this.helps.saveToken(response);
        return true;
      }),
      catchError((error) => {
        console.error("AuthGuard->",error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

}