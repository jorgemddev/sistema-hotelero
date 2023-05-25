import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-generator-sku',
  templateUrl: './generator-sku.component.html',
  styleUrls: ['./generator-sku.component.css']
})
export class GeneratorSkuComponent implements OnInit {

  constructor(private modal: NgbModal, private modalService: NgbModalConfig) { }
  @Output()
  success = new EventEmitter<string>();
  @Output()
  closeMdl = new EventEmitter<boolean>();

  witchNumber: boolean = false;
  sku: string = "";
  product: string = "";
  pref: string = "";
  brand: string = "";
  model: string = "";
  number: string = "";
  ngOnInit(): void {
  }

  generate(event: any, option) {
    var value: string = event.target.value;
    if (value.length > 3) {
      switch (option) {
        case 1:
          this.product = value.substring(0, 3);
          break;
        case 2:
          this.pref = value.substring(0, 3);
          break;
        case 3:
          this.brand = value.substring(0, 3);
          break;
        case 4:
          this.model = value.substring(0, 3);
          break;

      }
      this.sku = this.pref + this.product + this.brand + this.model + this.number;
    } else if (value.length < 4) {
      switch (option) {
        case 1:
          this.product = value;
          break;
        case 2:
          this.pref = value;
          break;
        case 3:
          this.brand = value;
          break;
        case 4:
          this.model = value;
          break;
      }
      this.sku = this.pref + this.product + this.brand + this.model + this.number;
    }
  }
  addNumber() {
    this.witchNumber = !this.witchNumber;
    if (this.witchNumber) {
      var number = this.getRandomArbitrary(1000, 9999);
      this.number = number.toString();
      this.sku = this.pref + this.product + this.brand + this.model + this.number;
    } else {
      this.number = "";
      this.sku = this.pref + this.product + this.brand + this.model;
    }
  }
  getRandomArbitrary(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
  }
  save() {
    this.success.emit(this.sku);
    this.closeMdl.emit(true);
  }
}
