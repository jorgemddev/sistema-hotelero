import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MyValidators } from 'src/app/libs/my-validators';
import { Users } from 'src/app/models/interfaces/users';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}
  ngOnInit(): void {
    this.getCities();
    this.getTypes();
  
    if (this.users != null) {
      this.getusers(this.users);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.users != null) {
      this.getusers(this.users);
    }
  }
  @Output()
  success = new EventEmitter<boolean>();
  @Input()
  users?: Users;
  types: any;

  cities: any;
  items: any;
  form1 = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl(),
    lastname: new UntypedFormControl(''),
    rutview: new UntypedFormControl({value:'',disabled:true}),
    rut: new UntypedFormControl(),
    cities_id: new UntypedFormControl(0),
    location: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    pass:new UntypedFormControl(''),
    privileges_id:new UntypedFormControl(0),
    whatsapp: new UntypedFormControl(''),
  });
  getusers(users: Users) {
    this.api.getUser(users.id).subscribe((res)=>{
      let data=res.data as Users;
      this.form1.patchValue(res.data);
      this.form1.get('rutview')?.setValue(data?.rut);
    },error=>{
      this.toast.warning(error.error.mistakes,error.error.msg,{enableHtml:true,closeButton:true});
    });
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
  onFormatRut(value: any) {
    if (value.target.value.length > 8) {
      this.form1
        .get('rut')
        ?.setValue(formatRut(value.target.value, RutFormat.DOTS_DASH));
    }
  }
  update() {
    this.api.updateUser(this.form1).subscribe(
      (response) => {
        this.toast.success(response.msg, 'Usuarios');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (err) => {
        this.toast.warning(err.error.mistakes, err.error.msg,{enableHtml:true,closeButton:true});
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
