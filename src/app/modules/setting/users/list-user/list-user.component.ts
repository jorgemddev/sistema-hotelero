import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { Privileges } from 'src/app/models/interfaces/privileges';
import { Users } from 'src/app/models/interfaces/users';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router
  ) {}

  view: number = 1;
  status: any;
  usersSelected?: Users;
  ngOnInit(): void {
    this.getUsers();
  }

  users: Users[];
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  brands: any;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    barcode: new UntypedFormControl(''),
    serie: new UntypedFormControl(''),
    sku: new UntypedFormControl(''),
    brand_id: new UntypedFormControl(),
    model_id: new UntypedFormControl(''),
    family_id: new UntypedFormControl(0),
    state_id: new UntypedFormControl(0),
    from: new UntypedFormControl(0),
    to: new UntypedFormControl(0),
  });
  secondForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  delete() {
    this.api.deleteUser(this.secondForm).subscribe(
      (res) => {
        this.toast.success('Usuario eliminado correctamente', 'USUARIOS');
        this.getUsers();
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.msg,{enableHtml:true,closeButton:true});
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['inventario/proveedores/editar/' + id]);
  }
  goToCreate() {
    this.router.navigate(['complementos/slider-principal']);
  }
  getUsers() {
    this.api.getUsers(this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.users = data.items as Users[];
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;

        this.totalPage = data.total;
      },
      (error) => {
        this.users = null;
        this.page = 1;
        this.collectionSize = 0;
        this.totalPage = 0;
        this.toast;
      }
    );
  }
  openModal(md: any, size: string = 'md') {
    this.modal.open(md, {
      size: size,
    });
  }
  openAssign(users: Users, md: any, size: string = 'md') {
    this.usersSelected = users;
    this.modal.open(md, {
      size: size,
    });
  }
  openDelete(users: Users, md: any) {
    this.usersSelected = users;
    this.modal.open(md, {
      size: 'md',
    });
  }
  openEdit(users: Users, md: any) {
    this.usersSelected = users;
    this.modal.open(md, {
      size: 'md',
    });
  }
  search() {
    this.getUsers();
  }
  clean() {}
}
