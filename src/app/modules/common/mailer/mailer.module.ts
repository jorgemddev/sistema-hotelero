import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendMailComponent } from './send-mail/send-mail.component';
import { EditorHtmlModule } from '../editor-html/editor-html.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendDefaultComponent } from './send-default/send-default.component';
import { SpinnerLoadingSmallComponent } from 'src/app/components/standalone/spinner-loading-small/spinner-loading-small.component';



@NgModule({
  declarations: [
    SendMailComponent,
    SendDefaultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EditorHtmlModule,
    SpinnerLoadingSmallComponent
  ],
  exports:[
    SendMailComponent,SendDefaultComponent
  ]
})
export class MailerModule { }
