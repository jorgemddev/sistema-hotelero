import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SidebarService  {
  private sidebarVisible = new BehaviorSubject<boolean>(true);

  constructor() {}


  toggleSidebar(): void {
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  isSidebarVisible(): BehaviorSubject<boolean> {
    return this.sidebarVisible;
  }
}
