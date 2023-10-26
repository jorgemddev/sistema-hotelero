import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { BrandComponent } from './company/brand/brand.component';
import { MultimediaComponent } from './company/multimedia/multimedia.component';
import { ProfileComponent } from './users/profile/profile.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepositoryImageModule } from '../common/repository-image/repository-image.module';
import { UsersComponent } from './users/users.component';
import { CompanyComponent } from './company/company.component';
import { SocialMediaComponent } from './company/social-media/social-media.component';
import { ConfigComponent } from './config/config.component';
import { ConfigEmailComponent } from './config/config-email/config-email.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddConfigEmailComponent } from './config/config-email/add-config-email/add-config-email.component';
import { ImageDefaultConfig, ImageDefaultModule } from '../../directives/image-default/image-default.module';
import { WarningInputFormsComponent } from 'src/app/components/standalone/warning-input-forms/warning-input-forms.component';
import { InputPasswordGenerateComponent } from 'src/app/components/standalone/input-password-generate/input-password-generate.component';
import { InputTextCompleteComponent } from 'src/app/components/standalone/input-text-complete/input-text-complete.component';
import { ConfigDocumentsComponent } from './config/config-documents/config-documents.component';
import { UploadFileModule } from '../common/upload-file/upload-file.module';
import { BackButtonComponent } from 'src/app/components/standalone/back-button/back-button.component';
import { AddDocumentComponent } from './config/config-documents/add-document/add-document.component';
import { EditDocumentComponent } from './config/config-documents/edit-document/edit-document.component';
import { UploadTemplateModule } from '../common/upload-template/upload-template.module';
import { EditorHtmlModule } from '../common/editor-html/editor-html.module';

const imageConfig: ImageDefaultConfig = {
  defaultImages: {
    avatar: 'assets/images/avatar.png',
    beda: 'assets/images/beda.png'
  },
};
@NgModule({
  declarations: [
    SettingComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    MultimediaComponent,
    BrandComponent,
    UsersComponent,
    CompanyComponent,
    SocialMediaComponent,
    ConfigComponent,
    ConfigEmailComponent,
    AddConfigEmailComponent,
    ConfigDocumentsComponent,
    AddDocumentComponent,
    EditDocumentComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RepositoryImageModule,
    NgbPaginationModule,
    WarningInputFormsComponent,
    InputPasswordGenerateComponent,
    InputTextCompleteComponent,
    UploadFileModule,
    UploadTemplateModule,
    BackButtonComponent,
    EditorHtmlModule,
    NgbModule, ImageDefaultModule.forRoot(imageConfig)
  ],
  exports:[
    AddDocumentComponent
  ]
})
export class SettingModule { }
