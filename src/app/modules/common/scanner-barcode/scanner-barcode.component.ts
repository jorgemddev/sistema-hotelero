import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-scanner-barcode',
  templateUrl: './scanner-barcode.component.html',
  styleUrls: ['./scanner-barcode.component.css']
})
export class ScannerBarcodeComponent implements OnInit {
  ngOnInit(): void {
    console.log("Se inicia lector de nbarcode");
  }
  value: string;
  isError = false;
  onError(error: any) {
    console.error(error);
    this.isError = true;
  }
}