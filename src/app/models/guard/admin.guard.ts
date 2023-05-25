import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  logged: boolean = false;
  constructor(private router: Router, private auth: AuthService) {
    this.auth.isLogged.subscribe(rs=>{
     if(!rs){
      router.navigate(['/login']);
     }
    });
    if(!this.isLoggedIn){
      this.auth.setLogin(false,'','','0');
      router.navigate(['/login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isLoggedIn;
  }

  // Returns true when user is looged in and email is verified
  private get isLoggedIn(): boolean {
    return sessionStorage.getItem('ccviTkn') !== null ? true : false;
  }
}
