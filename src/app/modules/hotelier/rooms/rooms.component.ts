import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  constructor(private location: Location, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/hotel/habitaciones") ? true : false;
    });
  }
  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/hotel/habitaciones") ? true : false;
  }
  isActive: boolean=false;
}
