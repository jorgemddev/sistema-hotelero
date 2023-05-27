import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(private api: ApiService, private router:Router, private modal:NgbModal,  private toast:ToastrService) {}
  usernameDisp = '...';
  textColor="";
  showAlert: boolean = false;
  error: any;
  userForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    lastname: new UntypedFormControl(''),
    image:new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    position: new UntypedFormControl(''),
    privileges_id: new UntypedFormControl(0),
    id: new UntypedFormControl(''),
  });
  ngOnInit(): void {
    this.getData();
  }
  privileges: any = [];
  companys: any = [];
  regions: any = [];
  cities: any = [];

  create() {
    this.api.createUser(this.userForm).subscribe(
      (response) => {
        this.toast.success('Creado correctamente','Colaborador');
          setTimeout(() => {
            this.router.navigate(['/colaboradores/listar']);
          }, 3000);
      },
      (e) => {
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }

  checkNick(event: any) {
    var username: string = this.userForm.get('username')?.value??"";
    if (username.length > 3) {
      this.usernameDisp = 'cargando...';
      this.api.checkUser(username).subscribe(
        (response) => {
            this.textColor='text-success';
            this.usernameDisp = response.msg;
        },
        (e) => {
            this.toast.warning(e.error.mistakes,e.error.msg);

        }
      );
    }else{
      this.textColor='text-warning';
      this.usernameDisp = 'Minimo 3 caracteres';
    }
    console.log(username);
  }
  getData() {
    this.api.getPrivileges().subscribe(
      (response) => {
        var data = response.data;
        this.privileges = data;
      },
      (error) => {
        this.error = error;
      }
    );
    this.api.getCompanys().subscribe(
      (response) => {
        var data = response.data;
        this.companys = data;
      },
      (error) => {
        this.error = error;
      }
    );
  }
  openRepository(inputTag: string, md: any) {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
