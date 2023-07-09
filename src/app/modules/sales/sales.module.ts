import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { PosInitComponent } from './pos/pos-init/pos-init.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from '../common/shareds/shareds.module';
import { ClockDigitalComponent } from 'src/app/components/standalone/clock-digital/clock-digital.component';
import localeEs from '@angular/common/locales/es';
import { PosRoutingModule } from './sales-routing.module';
import { PosCloseComponent } from './pos/pos-close/pos-close.component';
import { PosComponent } from './pos/pos.component';
import { PaymentsModule } from '../common/payments/payments.module';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PosAddComponent } from './pos/pos-add/pos-add.component';
import { PosValidationComponent } from './pos/pos-validation/pos-validation.component';
import { PosRemoveComponent } from './pos/pos-remove/pos-remove.component';
registerLocaleData(localeEs);


@NgModule({
    declarations: [
        PosComponent,
        PosInitComponent,
        PosCloseComponent,
        PosAddComponent,
        PosValidationComponent,
        PosRemoveComponent
    ],
    exports: [
        PosInitComponent,
        PosCloseComponent,
        PosComponent
    ],
    imports: [
        CommonModule,
        PosRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedsModule,
        ClockDigitalComponent,
        PaymentsModule,
        NgbPaginationModule
    ]
})
export class SalesModule { }
