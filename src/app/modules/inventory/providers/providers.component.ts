import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent {
  constructor(private route: Router, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/inventario/proveedores") ? true : false;
    });
  }
  isActive: boolean=false;
}
