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

  setLogin(valid: boolean, uid: string, token: string, level: string): void {
    console.log('AuthService emitir ' + valid);
    if (valid) {
      sessionStorage.setItem('ccviUid', uid);
      sessionStorage.setItem('ccviTkn', token);
      sessionStorage.setItem('ccviLevel', level);
      this.isValid.next(valid);
    } else {
      sessionStorage.removeItem('ccviUid');
      sessionStorage.removeItem('ccviTkn');
      sessionStorage.removeItem('ccviLevel');
      this.isValid.next(valid);
      this.logout();
    }
  }

  public logout() {
    sessionStorage.removeItem('ccviUid');
    sessionStorage.removeItem('ccviTkn');
    sessionStorage.removeItem('ccviLevel');
    this.router.navigate(['/login']);
  }


}
