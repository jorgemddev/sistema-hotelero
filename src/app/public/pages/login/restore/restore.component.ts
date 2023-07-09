import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css']
})
export class RestoreComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private toast: ToastrService
  ) {
  }
  disabledSubmit: boolean = false;
  domain: string = environment.domain;
  link:string;
  ngOnInit(): void {

  }
  loginForm = new UntypedFormGroup({
    rpass: new UntypedFormControl(''),
    pass: new UntypedFormControl(''),
  });

  validate() {
    this.api.validatePass(this.link).subscribe(
      (response) => {
        console.log('validado');
        var profile = response.data as Profile;

        this.router.navigate(['/dash']);
      },
      (result) => {
        this.toast.warning(result.error.msg, '¡Tenemos un error!');
      }
    );
    console.log('no validado');
  }

  resetPass(){
    
  }
 
  inProgress(rs: boolean) {
    console.log('inProgress' + rs);
    this.disabledSubmit = rs;
  }
}
