import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private modal: NgbModal,
    private request: RequestsService,
    private toast: ToastrService,
    private routeActive: ActivatedRoute
  ) {}
  usernameDisp = '...';
  textColor = '';
  showAlert: boolean = false;
  error: any;
  userForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    lastname: new UntypedFormControl(''),
    image: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    position: new UntypedFormControl(''),
    privileges_id: new UntypedFormControl(0),
    id: new UntypedFormControl(''),
  });
  passForm = new UntypedFormGroup({
    id: new UntypedFormControl(0, Validators.required),
    rpass: new UntypedFormControl('', Validators.required),
    pass: new UntypedFormControl('', Validators.required),
  });
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.getData();
      console.log('id:' + data['id']);
      this.getUser(data['id']);
    } else {
      console.log('Se devuelve');
      this.router.navigate(['/users/list-user']);
    }
  }
  privileges: any = [];
  companys: any = [];
  regions: any = [];
  cities: any = [];

  update() {
    this.api.updateUser(this.userForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success('Actualizado correctamente', 'Colaborador');
        setTimeout(() => {
          this.router.navigate(['/colaboradores/listar']);
        }, 3000);
      },
      (error) => {
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,'Error al modificar registro');
      }
    );
  }
  updatePass() {
    if (this.passForm.get('pass')?.value == this.passForm.get('rpass')?.value) {
      this.api.updateUserPass(this.passForm).subscribe(
        (response) => {
          this.request.setLoading(false);
          setTimeout(() => {
            this.modal.dismissAll();
          }, 2000);
        },
        (error) => {
          this.request.setCode(error);
          this.toast.warning(error.error.mistakes,'Error al modificar registro');
        }
      );
    } else {
      this.toast.warning(
        'Las contraseñas, no coinciden',
        '¡Tenemos un problema!'
      );
    }
  }
  getUser(id: number) {
    this.api.getUser(id).subscribe(
      (response) => {
        this.userForm.patchValue(response.data);
        this.passForm.get('id')?.setValue(id);
      },
      (error) => {
        this.error = error;
      }
    );
  }
  checkNick(event: any) {
    var username: string = this.userForm.get('username')?.value ?? '';
    if (username.length > 3) {
      this.usernameDisp = 'cargando...';
      this.api.checkUser(username).subscribe(
        (response) => {
          this.textColor = 'text-success';
          this.usernameDisp = response.msg;
        },
        (error) => {
          if (error.status == 400) {
            this.textColor = 'text-danger';
            this.usernameDisp = error.error.msg;
          } else {
            this.request.setCode(error);
          }
        }
      );
    } else {
      this.textColor = 'text-warning';
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
  openPass(modal: any) {
    this.modal.open(modal);
  }
}
