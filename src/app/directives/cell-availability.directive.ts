import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCellAvailability]'
})
export class CellAvailabilityDirective implements OnInit {
  @Input('appCellAvailability') availabilityId: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setCellBorderColor();
  }

  private setCellBorderColor() {
    let borderColor = '';

    switch (this.availabilityId) {
      case 2:
        borderColor = 'red'; // Ocupada
        this.el.nativeElement.style.border = `2px solid ${borderColor}`;
        break;
      case 3:
        borderColor = 'yellow'; // Reservada
        this.el.nativeElement.style.border = `2px solid ${borderColor}`;
        break;
    }
  }
}
