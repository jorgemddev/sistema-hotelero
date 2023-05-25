import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.css']
})
export class NavViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
@Input() items:any;
}
