import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-hotelier',
  templateUrl: './hotelier.component.html',
  styleUrls: ['./hotelier.component.css']
})
export class HotelierComponent implements  OnInit {
  constructor(private location: Location, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/hotel") ? true : false;
    });
  }

  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/hotel") ? true : false;
  }
  isActive: boolean=false;
}
