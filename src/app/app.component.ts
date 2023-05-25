import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Output() route = new EventEmitter<any>();
  title = 'admin';
  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = 'Demo';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.route.emit(this.currentRoute);
      }
    });
  }
}
