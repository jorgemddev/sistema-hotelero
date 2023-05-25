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
import { NgFallimgModule } from 'ng-fallimg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PrivateComponent,
    MainSidebarComponent,
    MainFooterComponent,
    MainContentComponent,
    MainNavComponent,
    DashComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrivateRoutingModule,
    HttpClientModule,
    NgDynamicBreadcrumbModule,
    NgFallimgModule.forRoot({
      default: '/assets/images/default.jpg',
      logo: '/assets/images/logo-company-default.png',
    }),
    ToastrModule.forRoot(),
  ],
  exports: [PrivateComponent,FormsModule,
    ReactiveFormsModule,],
})
export class PrivateModule {}
