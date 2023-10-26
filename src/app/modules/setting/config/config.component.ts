import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent  {
  constructor(private route: Router, private appComponent:AppComponent, private location:Location) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/configuracion/ajustes") ? true : false;
    });
  }
  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/configuracion/ajustes") ? true : false;
  }
  isActive: boolean=false;
}
