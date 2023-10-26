import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {
  constructor(private location: Location) { }
  @Input() cssClass: string;
  goBack(): void {
    this.location.back();
  }
}