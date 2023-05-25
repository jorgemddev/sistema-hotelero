import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-list-web-page',
  templateUrl: './list-web-page.component.html',
  styleUrls: ['./list-web-page.component.css']
})
export class ListWebPageComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ApiService,
    private modal: NgbModal,
    private toast:ToastrService,
    private request:RequestsService
  ) {}
  level: any;
  ngOnInit(): void {
    this.getPages();
    this.level = sessionStorage.getItem('ccviLevel')
      ? sessionStorage.getItem('ccviLevel')
      : 0;
  }
  update(id: number,full:boolean=false) {
    console.log('update', id);
    if(full){
      this.router.navigate(['/sitio-web/contenido/editar-full/' + id]);
    }else{
      this.router.navigate(['/sitio-web/contenido/editar/' + id]);
    }
    
  }
  view: number = 1;
  showAlert: boolean = false;
  tcheck: number = 1;
  primaryForm = new UntypedFormGroup({
    filter: new UntypedFormControl(1),
    to: new UntypedFormControl(''),
    from: new UntypedFormControl(''),
    state_id: new UntypedFormControl(0),
    id: new UntypedFormControl(0),
    dateIn: new UntypedFormControl(''),
    dateOut: new UntypedFormControl(''),
  });
  secondForm = new UntypedFormGroup({
    filter: new UntypedFormControl(1),
    to: new UntypedFormControl(''),
    from: new UntypedFormControl(''),
    state_id: new UntypedFormControl(0),
    id: new UntypedFormControl(0),
    dateIn: new UntypedFormControl(''),
    dateOut: new UntypedFormControl(''),
  });
  thirdForm = new UntypedFormGroup({
    id: new UntypedFormControl(0),
  });
  error: any;
  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;
  deleteId = 0;
  institutions: any = [];
  departments: any = [];
  cities: any = [];
  types: any = [];
  regions: any = [];
  brands: any = [];
  colors: any = [];
  reasons: any = [];
  cranes: any = [];

  getPages() {
    this.api.searchPages(this.primaryForm, this.page).subscribe(
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
    this.primaryForm.reset();
    this.page = 1;
    this.tcheck = 1;
    this.primaryForm.get('filter')?.setValue(1);
    this.primaryForm.get('state_id')?.setValue(0);
  }
  openDelete(id: number, md: any) {
    this.thirdForm.get('id').setValue(id);
    this.deleteId = id;
    this.modal.open(md, { size: 'md' });
  }
  delete() {
    this.api.deletePages(this.thirdForm).subscribe(
      (response) => {
        this.items = response.data;
        this.toast.success('Sección  eliminada correctamente','Secciones');
        this.modal.dismissAll();
        this.getPages();
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  search() {
    console.log(this.primaryForm.value);
    this.getPages();
  }
}
