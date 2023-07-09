import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MyValidators } from 'src/app/libs/my-validators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}
  ngOnInit(): void {
    this.getCities();
    this.getTypes();
  }
  @Output()
  success = new EventEmitter<boolean>();
  cities: any;
  types: any;
  items: any;
  form1 = new UntypedFormGroup({
    name: new UntypedFormControl(),
    lastname: new UntypedFormControl(''),
    rut: new UntypedFormControl('',[Validators.required,MyValidators.rut]),
    position: new UntypedFormControl(''),
    location: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    pass:new UntypedFormControl({value:''},[Validators.required,MyValidators.rut]),
    privileges_id:new UntypedFormControl(0),
    cities_id:new UntypedFormControl(0)
  });

  create() {
    this.api.createUser(this.form1).subscribe(
      (res) => {
        this.toast.success(res.msg, 'Registro de participante');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg,{enableHtml:true,closeButton:true});
      }
    );
  }
  onFormatRut(value: any) {
    if (value.target.value.length > 8) {
      this.form1
        .get('rut')
        ?.setValue(formatRut(value.target.value, RutFormat.DOTS_DASH));
    }
  }
  getCities() {
    this.api.getCities().subscribe(
      (response) => {
        this.cities = response.data;
      },
      (err) => {
        this.toast.warning(
          'Lo sentimos, ocurrio un error al cargar las ciudades'
        );
      }
    );
  }
  getTypes() {
    this.api.getPrivileges().subscribe(
      (response) => {
        this.types = response.data;
      },
      (err) => {
        this.toast.warning(
          'Lo sentimos, ocurrio un error al cargar los privilegios'
        );
      }
    );
  }
  openModal(md: any, size = 'md') {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
