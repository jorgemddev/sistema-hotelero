import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPurchaseComponent } from './shared-purchase/shared-purchase.component';
import { ApiSharedService } from './api-shared.service';
import { ShareWhatsappComponent } from './share-whatsapp/share-whatsapp.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorHtmlModule } from '../editor-html/editor-html.module';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  declarations: [
    SharedPurchaseComponent,
    ShareWhatsappComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  exports:[
    SharedPurchaseComponent
  ],
  providers: [
    ApiSharedService,
  ],
})
export class SharedsModule { }
