import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, tap } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { SpinnerService } from 'src/app/services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService, private toast: ToastrService, private router: Router, private helps: Helps) { }
  private pollingUrls: string[] = ['/reservations']; // Agrega las URL de las solicitudes de polling aquí

  private isPollingRequest(req: HttpRequest<any>): boolean {
    return this.pollingUrls.some(url => req.url.includes(url));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isPollingRequest = this.isPollingRequest(req);

    if (!isPollingRequest) {
      this.spinnerService.show();
    }

    var updatedReq = req.clone({ url: req.url });
    if (sessionStorage.getItem('token') != null) {
      const token = this.helps.getToken()?.token;
      updatedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        url: req.url + "?uid=" + this.helps.getToken()?.id
      });
    }

    return next.handle(updatedReq).pipe(
      tap(
        (event: HttpEvent<Response>) => {
          let results = event as any;
          if (results.status) {
            this.spinnerService.hide();
          }
        },
        (err: any) => {
          if (err.status == 500) {
            this.toast.error(
              'Tenemos un error en la comunicación con el servidor',
              'Lo sentimos'
            );
          }
          this.spinnerService.hide();
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      )
    );
  }
}
