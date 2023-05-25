import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-list-movements',
  templateUrl: './list-movements.component.html',
  styleUrls: ['./list-movements.component.css']
})
export class ListMovementsComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private request: RequestsService
  ) { }
  ngOnInit(): void {
    this.getMovements();
  }
  item: any;
  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;
  filter = 0;
  q: string="";

  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    barcode: new UntypedFormControl({ value: '', disabled: true }),
    name: new UntypedFormControl({ value: '', disabled: true }),
    user: new UntypedFormControl({ value: '', disabled: true }),
    sku: new UntypedFormControl({ value: '', disabled: true }),
    intstk: new UntypedFormControl({ value: '', disabled: true }),
    outstk: new UntypedFormControl({ value: '', disabled: true }),
    type: new UntypedFormControl({ value: '', disabled: true }),
    created_at: new UntypedFormControl({ value: '', disabled: true }),
  });

  getMovements() {
    this.api.listMovements(this.q,this.filter,this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
      },
      (error) => {
        this.request.setCode(error);
        this.items = null;
        this.page = 1;
        this.collectionSize = 0;
        this.totalPage = 0;
        this.toast;
      }
    );
  }
  openModal(md: any, item: any, size: string = 'md') {
    this.form.patchValue(item);
    console.log(item);
    this.modal.open(md, {
      size: size,
    });
  }
  search(q: any) {
    if (q.value.length > 2) {
      this.q = q.value;
      this.getMovements();
    }else{
      this.q="";
      this.getMovements();
    }

  }
  filterMovements(filter: any) {
    this.filter = filter.value;
    this.getMovements();
  }
  clean() { }
}
