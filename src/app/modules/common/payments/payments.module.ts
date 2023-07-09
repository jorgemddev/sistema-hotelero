import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { AddPaymentsComponent } from './add-payments/add-payments.component';
import { EditPaymentsComponent } from './edit-payments/edit-payments.component';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedsModule } from "../shareds/shareds.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddChargesComponent } from './add-charges/add-charges.component';
import { SalesModule } from '../../sales/sales.module';
import { MailerModule } from '../mailer/mailer.module';




@NgModule({
    declarations: [
        PaymentsComponent,
        AddPaymentsComponent,
        EditPaymentsComponent,
        AddChargesComponent
    ],
    exports: [PaymentsComponent, AddChargesComponent, AddPaymentsComponent],
    imports: [
        CommonModule,
        NgbPaginationModule,
        SharedsModule,
        ReactiveFormsModule,
        FormsModule,
        MailerModule
    ]
})
export class PaymentsModule { }
