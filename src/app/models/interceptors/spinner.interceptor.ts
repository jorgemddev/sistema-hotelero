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
  constructor(private spinnerService: SpinnerService,private toast:ToastrService,private router:Router,private helps:Helps) {}



  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    const updatedReq = req.clone({ url: req.url + this.helps.getUrlTknUid() });
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
