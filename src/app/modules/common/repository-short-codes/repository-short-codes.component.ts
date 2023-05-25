import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-repository-short-codes',
  templateUrl: './repository-short-codes.component.html',
  styleUrls: ['./repository-short-codes.component.css']
})
export class RepositoryShortCodesComponent implements OnInit {

  constructor(private modal: NgbModal) { }
  module = 1;
  ngOnInit(): void {
    
  }
  items: any = [{ id: 1, module: 1 }]


  openModal(md: any, size: string = 'lg', module: number = 1) {
    this.module = module;
    this.modal.open(md, {
      size: size,
      animation:true,
      keyboard:true
    });
  }
  selected(event: any) {

  }
}
