import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { environment } from 'src/environments/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Company } from 'src/app/models/interfaces/company';
import { Users } from 'src/app/models/interfaces/users';
import { Helps } from 'src/app/libs/helps';
@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(private api: ApiService, private sidebarService: SidebarService, private breakpointObserver: BreakpointObserver, private helps: Helps) { }
  sidebarVisible = false; // Variable para controlar la visibilidad del sidebar
  company: Company;
  level: number;
  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => {
        console.log("ES MOBILE", result.matches);
        if (result.matches) {
          this.sidebarService.isSidebarVisible().subscribe((visible) => {
            console.log("CAMBIO ", visible);
            this.sidebarVisible = visible;
          });
        }
      });
    this.getCompany();
    this.level = this.helps.getToken()?.level;
  }
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
    this.sidebarVisible = !this.sidebarVisible;
  }

  getCompany() {
    this.api.getCompany().subscribe(
      (response) => {
        console.log("COMPANY", response);
        this.company = response.data as Company;

      }
    );
  }

}
