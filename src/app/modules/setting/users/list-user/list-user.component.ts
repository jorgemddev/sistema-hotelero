import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  UntypedFormGroup,
  UntypedFormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListtUserComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private modal: NgbModal,
    private toast:ToastrService
  ) {}
  ngOnInit(): void {
    this.getData();
  }
  showAlert: boolean = false;
  ppForm = new UntypedFormGroup({
    perpage: new UntypedFormControl(30),
  });
  dltForm = new UntypedFormGroup({
    id: new UntypedFormControl(''),
  });
  error: any;
  items: any;
  getData() {
    this.api.getUsers().subscribe(
      (response) => {
        this.items = response.data;
      },
      (e) => {
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  update(id: number) {
    console.log('update', id);
    this.router.navigate(['/configuracion/colaboradores/editar/' + id]);
  }
  openDelete(e: number, dlt: any) {
    console.log('delete', e);
    this.dltForm.get('id')?.setValue(e);
    this.modal.open(dlt,{size:'sm'});
  }
  delete() {
    this.api.deleteUser(this.dltForm).subscribe(
      (response) => {
        this.toast.success('Colaborador eliminado correctamente','Colaborador');
        this.items = response.data;
        this.modal.dismissAll();
        this.getData();
      },
      (e) => {
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  normalizeJump(item: string) {
    return item.split('\n').join('<br>');
  }
}
