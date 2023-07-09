import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { MainSidebarComponent } from '../components/main-sidebar/main-sidebar.component';
import { MainFooterComponent } from '../components/main-footer/main-footer.component';
import { MainContentComponent } from '../components/main-content/main-content.component';
import { MainNavComponent } from '../components/main-nav/main-nav.component';
import { DashComponent } from './pages/dash/dash.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HotelierModule } from '../modules/hotelier/hotelier.module';
import { StickyMobileDirective } from '../directives/sticky-mobile.directive';
import { StickyDesktopDirective } from '../directives/sticky-desktop.directive';
import { ImageDefaultConfig, ImageDefaultModule } from '../directives/image-default/image-default.module';
import { ClockDigitalComponent } from '../components/standalone/clock-digital/clock-digital.component';
import { SharedsModule } from '../modules/common/shareds/shareds.module';
import { SalesModule } from '../modules/sales/sales.module';
const imageConfig: ImageDefaultConfig = {
  defaultImages: {
    avatar: 'assets/images/avatar.png',
    beda: 'assets/images/beda.png'
  },
};
@NgModule({
  declarations: [
    PrivateComponent,
    MainSidebarComponent,
    MainFooterComponent,
    MainContentComponent,
    MainNavComponent,
    DashComponent,
    StickyMobileDirective,
    StickyDesktopDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateRoutingModule,
    HttpClientModule,
    NgDynamicBreadcrumbModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    HotelierModule,
    ToastrModule.forRoot(),
    ClockDigitalComponent,
    SharedsModule,
    SalesModule,
    ImageDefaultModule.forRoot(imageConfig)
  ],
  exports: [PrivateComponent, FormsModule,
    ReactiveFormsModule],
})
export class PrivateModule { }
