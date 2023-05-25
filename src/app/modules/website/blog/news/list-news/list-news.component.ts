import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css'],
})
export class ListNewsComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private request: RequestsService
  ) {}
  view:number=1;
  level: any;
  ngOnInit(): void {
    this.getNews();
    this.level = sessionStorage.getItem('ccviLevel')
      ? sessionStorage.getItem('ccviLevel')
      : 0;
  }
  update(id: number) {
    console.log('update', id);
    this.router.navigate(['/noticias/editar/' + id]);
  }
  frontPage(id: number) {
    this.api.frontPageNew(id).subscribe(
      (response) => {
          this.toast.success(
            'La noticia fue seleccionada para estar en portada',
            '¡Todo bien!'
          );
          this.getNews();
      },
      (error) => {
        this.toast.warning(
          'No fue posible establecer como destacada esta notifica',
          '¡Ups!'
        );
      }
    )
  }
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
  perpage: any = 0;
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

  getNews() {
    this.api.listNews(this.page).subscribe(
      (response) => {
        this.request.setLoading(false);
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
      },
      (error) => {
        this.request.setLoading(false);
        var data = error.error.data as Paginate;
        this.error = error;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
        this.request.setCode(error);
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
    this.api.deleteNews(this.thirdForm).subscribe(
      (response) => {
        this.items = response.data;
        this.toast.success('Noticia eliminada correctamente', 'Noticias');
        this.modal.dismissAll();
        this.getNews();
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  search() {
    console.log(this.primaryForm.value);
    this.getNews();
  }
}
