import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { AdminGuard } from 'src/app/models/guard/admin.guard';
import { Helps } from 'src/app/libs/helps';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  constructor(private location: Location, private appComponent:AppComponent, private helps:Helps) { 
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/hotel/habitaciones") ? true : false;
    });
  }
  level:number;
  ngOnInit(): void {
    this.level=this.helps.getToken()?.level;
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/hotel/habitaciones") ? true : false;
  }
  isActive: boolean=false;
}
