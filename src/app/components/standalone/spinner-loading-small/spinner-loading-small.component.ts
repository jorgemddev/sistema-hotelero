import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-spinner-loading-small',
  templateUrl: './spinner-loading-small.component.html',
  styleUrls: ['./spinner-loading-small.component.css'],
  imports:[CommonModule,]
})
export class SpinnerLoadingSmallComponent {
@Input()
view:boolean;

}
