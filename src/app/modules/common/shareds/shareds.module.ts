import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPurchaseComponent } from './shared-purchase/shared-purchase.component';
import { ApiSharedService } from './api-shared.service';
import { ShareWhatsappComponent } from './share-whatsapp/share-whatsapp.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { MoneyClPipe } from 'src/app/pipes/money-cl.pipe';



@NgModule({
  declarations: [
    SharedPurchaseComponent,
    ShareWhatsappComponent,
    MoneyClPipe
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  exports:[
    SharedPurchaseComponent,
    MoneyClPipe
  ],
  providers: [
    ApiSharedService,
  ],
})
export class SharedsModule { }
