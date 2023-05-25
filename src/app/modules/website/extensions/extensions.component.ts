import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrls: ['./extensions.component.css']
})
export class ExtensionsComponent {
  constructor(private route: Router, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/sitio-web/complementos") ? true : false;
    });
  }
  isActive: boolean=false;
}
