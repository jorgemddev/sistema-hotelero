import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClientsComponent } from './clients/list-clients/list-clients.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarSearchComponent } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { ImageDefaultConfig, ImageDefaultModule } from 'src/app/directives/image-default/image-default.module';
import { ContactsModule } from '../common/contacts/contacts.module';
import { EditorHtmlModule } from '../common/editor-html/editor-html.module';
import { MailerModule } from '../common/mailer/mailer.module';
import { NotesModule } from '../common/notes/notes.module';
import { SharedsModule } from '../common/shareds/shareds.module';
import { CrmComponent } from './crm.component';
import { CrmRoutingModule } from './crm-routing.module';
import { UploadFileModule } from '../common/upload-file/upload-file.module';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add-client/add-client.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';


const imageConfig: ImageDefaultConfig = {
  defaultImages: {
    default: 'assets/images/default.jpg',
  },
};

@NgModule({
  declarations: [
    CrmComponent,
    ListClientsComponent,
    AddClientComponent,
    EditClientComponent,
    ClientsComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    ReactiveFormsModule,
    NotesModule,
    FormsModule,
    SharedsModule,
    ToolbarSearchComponent,
    FullCalendarModule,
    NgbPaginationModule,
    ContactsModule,
    NotesModule,
    NgbModule,
    EditorHtmlModule,
    MailerModule,
    UploadFileModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    ImageDefaultModule.forRoot(imageConfig)
  ],
  exports:[
    AddClientComponent
  ]
})
export class CrmModule { }

