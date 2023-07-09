import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { Users } from 'src/app/models/interfaces/users';
import { Denominations } from 'src/app/modules/sales/interfaces/denominations';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { CashService } from 'src/app/services/cash.service';
import { ApiSalesService } from '../../api-sales.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pos-close',
  templateUrl: './pos-close.component.html',
  styleUrls: ['./pos-close.component.css']
})
export class PosCloseComponent implements OnInit, OnChanges {
  denominations: Denominations[] = [
    { name: '20.000', value: 20000, subtotal: 0 },
    { name: '10.000', value: 10000, subtotal: 0 },
    { name: '5.000', value: 5000, subtotal: 0 },
    { name: '2.000', value: 2000, subtotal: 0 },
    { name: '1.000', value: 1000, subtotal: 0 },
    { name: '500', value: 500, subtotal: 0 },
    { name: '100', value: 100, subtotal: 0 },
    { name: '50', value: 50, subtotal: 0 },
    { name: '10', value: 10, subtotal: 0 },
  ];

  total: number = 0;
  myForm: FormGroup;
  modalRef: NgbModalRef;

  @Input()
  totalSales: number;
  @Input()
  efectivo: number;

  constructor(private modal: NgbModal, private auth: AuthService, private formBuilder: FormBuilder, private helps: Helps, private api: ApiSalesService, private apiPrimary: ApiService, private toast: ToastrService) { }
  ngOnChanges(changes: SimpleChanges): void {

    if (this.totalSales > 0) {
      this.form.get('totalsales')?.setValue(this.totalSales);
    }
    if (this.efectivo > 0) {
      this.form.get('earring')?.setValue(this.efectivo);
    }
  }
  user: Users;
  ngOnInit(): void {
    this.initializeForm();
    let data = this.helps.getToken()?.data as Users;
    this.user = data;
    console.log("DATA", data);
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  form = new UntypedFormGroup({
    autorization_id: new UntypedFormControl(0, Validators.required),
    totalsales: new UntypedFormControl(0, Validators.required),
    earring: new UntypedFormControl(0),
    obs: new UntypedFormControl('')
  });
  create(data: any) {
    if (!data?.id) {
      this.toast.warning("La operación no fue autorizada");
      return;
    }
    let autorization_id = data?.id;
    this.form.get('autorization_id')?.setValue(autorization_id);
    this.api.closeBox(this.form).subscribe((res) => {
      this.toast.success(res.msg);
      this.modal.dismissAll();
      setTimeout(() => {
        this.auth.logout();
      }, 3 * 1000);
    }, e => { this.toast.warning(e.error.mistakes, e.msg, { enableHtml: true, closeButton: true }); });
  }
  initializeForm(): void {
    const formControls = this.denominations.map((denomination) => {
      return new FormControl(denomination.quantity, Validators.required);
    });

    this.myForm = this.formBuilder.group({
      denominations: this.formBuilder.array(formControls)
    });
  }

  updateSubtotal(index: number): void {
    const denominationControl = this.denominationsFormArray.at(index) as FormControl;
    const quantity = +denominationControl.value;
    const denomination = this.denominations[index];

    denomination.subtotal = quantity * denomination.value;
    this.calculateTotal();
  }


  calculateTotal(): void {
    console.log("EFECTIVO", this.efectivo);
    this.total = 0;
    for (const denomination of this.denominations) {
      this.total += denomination.subtotal;
    }
    this.form.get('earring')?.setValue(Number(this.efectivo) - Number(this.total));
  }

  get denominationsFormArray() {
    return this.myForm.get('denominations') as FormArray;
  }
  openValidation(md: any, size = 'md') {
    if (!this.form.valid) {
      this.toast.warning('¡Complete los campos requeridos!');
      return;
    }
    this.modalRef = this.modal.open(md, {
      size: size,
      backdrop: 'static'
    });
  }
}
