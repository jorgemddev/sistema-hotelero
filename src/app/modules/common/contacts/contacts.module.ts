import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RepositoryImageModule } from '../repository-image/repository-image.module';
import { HotelierModule } from '../../hotelier/hotelier.module';




@NgModule({
  declarations: [
    AddContactComponent,
    EditContactComponent,
    ListContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbModule,
    RepositoryImageModule,
  ],exports:[
    AddContactComponent,
    EditContactComponent,
    ListContactComponent
  ]
})
export class ContactsModule { }
