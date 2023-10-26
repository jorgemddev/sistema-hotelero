import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from 'ngx-barcode-scanner';


@Component({
  selector: 'app-scanner-barcode',
  templateUrl: './scanner-barcode.component.html',
  styleUrls: ['./scanner-barcode.component.css']
})
export class ScannerBarcodeComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started) {
    console.log(started);
  }
}