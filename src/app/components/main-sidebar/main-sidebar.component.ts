import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }
  domain:string="";
  getCompany() {
    this.api.getCompany().subscribe(
      (response) => {
        var data = response.data as any;
        this.domain=(data.domain)?environment.baseWebsiteUrl:data.domain;
      }
    );
  }
  goToDomain(){
    window.location.href = this.domain;
  }
}
