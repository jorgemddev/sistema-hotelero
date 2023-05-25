import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-list-extensions',
  templateUrl: './list-extensions.component.html',
  styleUrls: ['./list-extensions.component.css']
})
export class ListExtensionsComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private request: RequestsService
  ) { }
  idSelected: number = 0;
  module: number = 0;
  level: any;
  ngOnInit(): void {
    this.getExtentions();
    this.level = sessionStorage.getItem('bdvlevel')
      ? sessionStorage.getItem('bdvlevel')
      : 0;
  }
  update(item: any, mdl: any) {
    this.idSelected = item.id;
    this.module = item.module;
    this.openModal(mdl);
  }
  showAlert: boolean = false;
  tcheck: number = 1;
  pForm = new UntypedFormGroup({
    id: new UntypedFormControl(0),
  });
  dForm = new UntypedFormGroup({
    id: new UntypedFormControl(0),
  });
  error: any;
  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;
  deleteId = 0;

  view: number = 1;

  getExtentions() {
    this.api.getExtensions(this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        if (response.status == 'ok') {
          this.items = data.items;
          this.page = data.current;
          this.perpage = data.per_page;
          this.collectionSize = data.count;
          console.log(this.collectionSize);
          this.totalPage = data.total;
        } else {
          this.items = data.items;
          this.page = data.current;
          this.perpage = data.per_page;
          this.collectionSize = data.count;
          console.log(this.collectionSize);
          this.totalPage = data.total;
        }
      },
      (error) => {
        this.error = error;
      }
    );
  }
  clean() {
    this.pForm.reset();
    this.page = 1;
    this.tcheck = 1;
    this.pForm.get('filter')?.setValue(1);
    this.pForm.get('state_id')?.setValue(0);
  }
  openDelete(id: number, md: any) {
    this.dForm.get('id').setValue(id);
    this.deleteId = id;
    this.modal.open(md, { size: 'sm' });
  }
  openModal(md: any) {
    this.modal.open(md, { size: 'xl' });
  }
  delete() {
    this.api.deleteExtensions(this.dForm).subscribe(
      (response) => {
        this.items = response.data;
        this.toast.success('Registro eliminado correctamente', 'Complementos');
        this.modal.dismissAll();
        this.getExtentions();
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  search() {
    this.getExtentions();
  }
}
