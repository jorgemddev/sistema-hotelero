import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercaseInput]'
})
export class UpperCaseDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    this.ngControl.valueAccessor?.writeValue(value.toUpperCase());
  }
}
