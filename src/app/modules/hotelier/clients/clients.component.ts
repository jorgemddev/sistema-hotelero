import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  constructor(private location: Location, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/hotel/clientes") ? true : false;
    });
  }

  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/hotel/clientes") ? true : false;
  }
  isActive: boolean=false;
}

