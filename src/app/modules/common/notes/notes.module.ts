import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { EditNotesComponent } from './edit-notes/edit-notes.component';
import { NgFallimgModule } from 'ng-fallimg';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorHtmlModule } from '../editor-html/editor-html.module';



@NgModule({
  declarations: [
    ListNotesComponent,
    AddNotesComponent,
    EditNotesComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    NgFallimgModule,
    FormsModule,
    ReactiveFormsModule,
    EditorHtmlModule
  ],
  exports:[
    ListNotesComponent,
    AddNotesComponent,
    EditNotesComponent
  ]
})
export class NotesModule { }
