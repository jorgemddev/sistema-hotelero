import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private api: ApiService) {
  }
  private isValid: Subject<boolean> = new Subject<boolean>();

  /**
   * method observable
   */
  public isLogged: Observable<boolean> = this.isValid.asObservable();



  public logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


}
