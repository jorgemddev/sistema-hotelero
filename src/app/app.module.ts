import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { RequestsService } from './services/requests.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerInterceptor } from './models/interceptors/spinner.interceptor';
import { NgFallimgModule } from 'ng-fallimg';
import { SpinnerModule } from './components/spinner/spinner.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    PublicModule,
    PrivateModule,
    SpinnerModule,    
    NgFallimgModule.forRoot({
      default: '/assets/images/default.jpg',
      logo: '/assets/images/logo-company-default.png'
    }),

  ],
  providers: [
    ApiService,
    AuthService,
    RequestsService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  exports: [NgFallimgModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
