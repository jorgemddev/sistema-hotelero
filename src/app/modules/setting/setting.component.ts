import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent  {
  constructor(private route: Router, private appComponent:AppComponent, private location:Location) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/configuracion") ? true : false;
    });
  }
  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/configuracion") ? true : false;
  }
  isActive: boolean=false;
}
