import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductComponent {
  constructor(private route: Router, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      console.log(route);
      this.isActive = (route == "/inventario/productos") ? true : false;
    });
  }
  isActive: boolean=false;
}
