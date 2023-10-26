import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements  OnInit {
  constructor(private location: Location, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/crm") ? true : false;
    });
  }

  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/crm") ? true : false;
  }
  isActive: boolean=false;
}
