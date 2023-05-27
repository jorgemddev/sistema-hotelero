import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Helps } from 'src/app/libs/helps';
import { Profile } from 'src/app/models/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,

    private toast: ToastrService,
    private helps: Helps,
  ) {
    // Recuperar el valor del contador del LocalStorage (si existe)
    const storedTime = localStorage.getItem('time');
    this.time = (storedTime) ? parseInt(storedTime) : 0;
    if (this.time <= 30 && this.time != 0) {
      console.log(this.time);
      this.countDown();
    }
  }

  showAlert: boolean = false;
  disabledSubmit: boolean = false;
  domain: string = environment.domain;
  restore?: boolean = false;
  send: boolean = false;
  time: number = 0;
  int: number = 0;
  intervalId: any;
  ngOnInit(): void {
    if (this.auth.isLogged) {
      console.log('Esta validado, redireccionar');
      this.router.navigate(['/dash']);
    } else {
      console.log('No esta validado');
    }

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('time', this.time.toString());
    });
  }
  loginForm = new UntypedFormGroup({
    cod: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    pass: new UntypedFormControl(''),
  });

  login() {
    const { cod, pass } = this.loginForm.value;
    this.api.login(cod, pass).subscribe(
      (response) => {
        console.log("RESPONSE LOGIN:",response );
        this.helps.saveToken(response);
        this.router.navigate(['/dash']);
      },
      (e) => {
        console.log("RESPONSE ERROR LOGIN:",e );
        this.toast.warning(e.error.mistakes, '¡Tenemos un error!');
      }
    );
    console.log('no validado');
  }
  restorePass() {
    this.send = true;
    this.time = 30;
    this.int++;
    this.countDown();
    this.api.restorePass(this.loginForm).subscribe(
      (res) => {
        this.toast.success(res.msg);
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
        this.stopCount();
      }
    );
  }
  private countDown() {
    this.restore = true;
    this.intervalId = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.stopCount();
      }
    }, 1000);
  }
  stopCount() {
    this.time = 0;
    this.send = false;
    clearInterval(this.intervalId);
  }
  inProgress(rs: boolean) {
    console.log('inProgress' + rs);
    this.disabledSubmit = rs;
  }
}
