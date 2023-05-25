import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { BrandComponent } from './company/brand/brand.component';
import { MultimediaComponent } from './company/multimedia/multimedia.component';
import { ProfileComponent } from './users/profile/profile.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListtUserComponent } from './users/list-user/list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepositoryImageModule } from '../common/repository-image/repository-image.module';
import { NgFallimgModule } from 'ng-fallimg';
import { UsersComponent } from './users/users.component';
import { CompanyComponent } from './company/company.component';
import { SocialMediaComponent } from './company/social-media/social-media.component';
import { ConfigComponent } from './config/config.component';
import { ConfigEmailComponent } from './config/config-email/config-email.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddConfigEmailComponent } from './config/config-email/add-config-email/add-config-email.component';


@NgModule({
  declarations: [
    SettingComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    ListtUserComponent,
    MultimediaComponent,
    BrandComponent,
    UsersComponent,
    CompanyComponent,
    SocialMediaComponent,
    ConfigComponent,
    ConfigEmailComponent,
    AddConfigEmailComponent,
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RepositoryImageModule,
    NgbPaginationModule,
    NgbModule,
    NgFallimgModule.forRoot({
      default: '/assets/img/default.jpg',
      logo: '/assets/img/logo-company-default.png',
    }),
  ]
})
export class SettingModule { }
