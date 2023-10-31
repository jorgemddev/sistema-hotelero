import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Quagga from 'quagga';
@Component({
  selector: 'app-scanner-barcode',
  templateUrl: './scanner-barcode.component.html',
  styleUrls: ['./scanner-barcode.component.css']
})
export class ScannerBarcodeComponent implements OnInit {

  ngOnInit(): void {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#interactive') // Selector del div en el HTML
      },
      decoder: {
        readers: ["ean_reader"] // Tipos de códigos de barras que quieres leer
      }
    }, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      if (result?.codeResult?.code > 3 ) {
        this.onResult.emit(result?.codeResult?.code);
      }
    });
  }
  @Output()
  onResult = new EventEmitter<number>();
}