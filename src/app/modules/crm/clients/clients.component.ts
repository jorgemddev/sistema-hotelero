import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  constructor(private route: Router, private appComponent:AppComponent,private location:Location) {
    this.appComponent.route.subscribe((route)=>{
      console.log(route);
      this.isActive = (route == "/crm/clientes") ? true : false;
    });
  }
  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/crm/clientes") ? true : false;
  }
  isActive: boolean=false;
}