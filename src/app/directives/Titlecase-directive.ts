import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[titlecaseInput]'
})
export class TitleCaseDirective {
  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const newValue = this.toTitleCase(value);
    this.ngControl.valueAccessor?.writeValue(newValue);
  }

  private toTitleCase(value: string): string {
    if (!value) return '';

    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
