import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  constructor(private location: Location, private appComponent:AppComponent) {
    this.appComponent.route.subscribe((route)=>{
      this.isActive = (route == "/inventario") ? true : false;
    });
  }

  ngOnInit(): void {
    const currentPath = this.location.path();
    this.isActive = (currentPath === "/inventario") ? true : false;
  }
  isActive: boolean=false;
}
