import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Responses } from '../models/interfaces/responses';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {

constructor(private router:Router){}
  private loading: Subject<boolean> = new Subject<boolean>();
  private response:Subject<Responses> = new Subject<Responses>();
  /**
   * method observable
   */
  isLoading: Observable<boolean> = this.loading.asObservable();

  existsResponse: Observable<Responses> = this.response.asObservable();

  setLoading(show: boolean) {
    console.log('event loading ' + show);
    this.loading.next(show);
  }


  setCode(error: any): void {
    console.log('respuesta desde request es:');
    switch (error.status) {
      case 500:
        console.log('error 500');
        this.setLoading(false);
        this.response.next({msg:"La aplicación sufrio un problema, solicite asistencia al area de soporte",status:"fail",data:{},codeHttp:500});
        break;
      case 400:
        console.log('error 400');
        this.setLoading(false);
        this.response.next({msg:error.error.msg,status:"fail",data:{},mistakes:error.error.mistakes,codeHttp:400});
        break;
      case 401:
        console.log('error 401');
        sessionStorage.removeItem('ccviUid');
        sessionStorage.removeItem('ccviTkn');
        sessionStorage.removeItem('ccviLevel');
        this.router.navigate(['login']);
        this.response.next({msg:"Su sesión caduco, inicie sesión nuevamente'",status:"fail",data:{},codeHttp:401});
        break;
      case 403:
        console.log('error 403');
        this.response.next({msg:"No tiene autorización para el recurso o petición solicitada'",status:"fail",data:{},codeHttp:403});
        break;
      case 404:
        console.log('error 404');
          this.response.next({msg:"El recurso o pagina solicitada no fue encontrada 404'",status:"fail",data:{}});
        break;
      default:
        console.log('Solicitud correcta');
        this.setLoading(false);
        break;
    }
  }
}
