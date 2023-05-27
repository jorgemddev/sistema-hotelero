import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Helps } from 'src/app/libs/helps';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard  {
  constructor(private router: Router, private helps:Helps) {}
  canActivate() {
    // Se obtiene el valor del status_id del usuario actual, 
    // posiblemente haciendo uso de algún servicio
    const level: number = this.helps.getToken().level??0; // Puedes hacer esto dinámico
    console.log("level->",level);
    if (level==99) {
      // Si el usuario tiene un status_id de 1 que es participante está autorizado para acceder.
      return true;
    }  else {
      // Si el valor del status_id no coincide con ninguno de los valores anteriores,
      // redireccionamos el usuario a login.
      this.router.navigate(["/login"]);

      // Indicamos que el usuario no puede acceder a esa ruta.
      return false;
    }
  }
}
