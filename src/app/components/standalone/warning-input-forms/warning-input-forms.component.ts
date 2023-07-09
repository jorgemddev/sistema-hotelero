import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-warning-input-forms',
  templateUrl: './warning-input-forms.component.html',
  styleUrls: ['./warning-input-forms.component.css']
})
export class WarningInputFormsComponent  implements OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("errors:->",this.input?.errors);
  }
  @Input()
  input!: AbstractControl<string | null, string | null> | null;

  @Input()
  alertCss: string = "alert-danger";

  @Input()
  name: string = "campo";


}
