import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent  {
  constructor(private route: Router, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/configuracion/ajustes") ? true : false;
    });
  }
  isActive: boolean=false;
}
