import Quagga from 'quagga'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerBarcodeComponent } from './scanner-barcode.component';




@NgModule({
  declarations: [
    ScannerBarcodeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ScannerBarcodeComponent
  ],
})
export class ScannerBarcodeModule { }
