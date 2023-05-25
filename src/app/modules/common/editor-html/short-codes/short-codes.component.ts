import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-short-codes',
  templateUrl: './short-codes.component.html',
  styleUrls: ['./short-codes.component.css']
})
export class ShortCodesComponent implements OnInit {

  constructor(private modal:NgbModal,private api:ApiService) { }

  ngOnInit(): void {
  this.getExtentions();
  }
  @Output()
  onSelected = new EventEmitter<string>();

  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;
  deleteId = 0;

  selected(item: any) {
    this.onSelected.emit('[bcode id='+item.id+' m='+item.module+']');    
  }
  openModal(md: any) {
    this.modal.open(md, {
      size: 'xl',
    });
  }
  getExtentions() {
    this.api.getExtensions(this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        if (response.status == 'ok') {
          this.items = data.items;
          this.page = data.current;
          this.perpage = data.per_page;
          this.collectionSize = data.count;
          this.totalPage = data.total;
        } else {
          this.items = data.items;
          this.page = data.current;
          this.perpage = data.per_page;
          this.collectionSize = data.count;
          this.totalPage = data.total;
        }
      }
    );
  }
  search() {
    this.getExtentions();
  }
}
