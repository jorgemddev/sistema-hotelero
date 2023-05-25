import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private request: RequestsService,
    private routeActive: ActivatedRoute,
    private modal: NgbModal,
    private toast: ToastrService
  ) {}
  usernameDisp = '...';
  textColor = '';
  image: string = '';
  error: any;
  userForm = new UntypedFormGroup({
    username: new UntypedFormControl({ value: '', disabled: true }),
    name: new UntypedFormControl(''),
    lastname: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    position: new UntypedFormControl(''),
    image: new UntypedFormControl(''),
    privilege: new UntypedFormControl({ value: '', disabled: true }),
    id: new UntypedFormControl(''),
  });
  passForm = new UntypedFormGroup({
    pass: new UntypedFormControl('', Validators.required),
    rpass: new UntypedFormControl('', Validators.required),
    npass: new UntypedFormControl('', Validators.required),
  });
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    this.getProfile();
  }
  privileges: any = [];
  companys: any = [];
  update() {
    this.api.updateProfile(this.userForm).subscribe(
      (response) => {
        this.getProfile();
        this.toast.success('Cambios registrados correctamente');
      },
      (error) => {
        this.error = error;
        this.toast.warning(
          error.error.mistakes,
          'Error al modificar perfil'
        );
      }
    );
  }
  saveImageProfile() {
    this.update();
  }
  checkNick(event: any) {
    var username: string = this.userForm.get('username')?.value;
    if (username.length > 3) {
      this.usernameDisp = 'cargando...';
      this.api.checkUser(username).subscribe(
        (response) => {
          if (response.status == 'ok') {
            this.textColor = 'text-success';
            this.usernameDisp = response.msg;
          } else {
            this.textColor = 'text-danger';
            this.usernameDisp = response.msg;
          }
        },
        (error) => {
          this.error = error;
        }
      );
    } else {
      this.textColor = 'text-warning';
      this.usernameDisp = 'Minimo 3 caracteres';
    }
    console.log(username);
  }
  getProfile() {
    this.api.getProfile().subscribe(
      (response) => {
        var data = response.data;
        this.userForm.patchValue(data);
        this.image = this.userForm.get('image')?.value;
      },
      (error) => {
        this.error = error;
        this.toast;
      }
    );
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
  updatePass() {
    if (
      this.passForm.get('npass')?.value == this.passForm.get('rpass')?.value
    ) {
      this.api.updatePass(this.passForm).subscribe(
        (response) => {
          this.toast.success(
            'Su contraseña fue actualizada, por seguridad debe volver a iniciar sesión',
            'CONTRASEÑA'
          );
          setTimeout(() => {
            this.modal.dismissAll();
            this.auth.logout();
          }, 2000);
        },
        (error) => {
          this.request.setCode(error);
          this.toast.warning(
            error.error.mistakes,
            'Error al modificar contraseña'
          );
        }
      );
    } else {
      this.toast.warning('Las contraseñas no coinciden', 'Tenemos un error');
    }
  }
  openPass(md: any) {
    this.modal.open(md);
  }
  openRepository(inputTag: string, md: any) {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
