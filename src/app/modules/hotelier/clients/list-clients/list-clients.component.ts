import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,

  ) { }
  view: number = 1;
  status: any;
  categorys: any;
  idSelected: number = 0;
  ngOnInit(): void {
    this.getData();
    this.getClients();
  }

  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  brands: any;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  delete() {
    this.api.deleteClients(this.form).subscribe(
      (response) => {
        this.toast.success(
          'Cliente eliminado correctamente',
          'Gestión productos'
        );
        this.modal.dismissAll();
        this.getClients();
      },
      (e) => {
        
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['hotel/clientes/editar/' + id]);
  }
  getData() {
    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },
      (error) => {
        this.error = error;
      }
    );
  }
  getClients() {
    this.api.listClients(this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
      },
      (e) => {
       
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  openModal(md: any, size: string = 'md') {
    this.modal.open(md, {
      size: size,
    });
  }
  openDelete(id: number, md: any) {
    this.form.get('id').setValue(id);
    this.modal.open(md, {
      size: 'md',
    });
  }
  search() {
    this.getClients();
  }
  clean() { }
}
