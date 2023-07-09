import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Validators } from '@angular/forms';
import { ApiSalesService } from '../../api-sales.service';

@Component({
  selector: 'app-pos-add',
  templateUrl: './pos-add.component.html',
  styleUrls: ['./pos-add.component.css']
})
export class PosAddComponent implements OnInit {
  payment: any;
  constructor(
    private api: ApiSalesService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnInit(): void {


  }
  @Output()
  success = new EventEmitter<boolean>();

  primaryForm = new UntypedFormGroup({
    ammount: new UntypedFormControl('',Validators.required),
    detail: new UntypedFormControl('',Validators.required),
    autorization_id: new UntypedFormControl(0,Validators.required),
  });
  modalRef: NgbModalRef;
  create(data: any) {
    console.log("llego:", data);
    if (!data?.id) {
      this.toast.warning("La operación no fue autorizada");
      return;
    }
    let autorization_id = data?.id;
    this.primaryForm.get('autorization_id')?.setValue(autorization_id);
    this.api.addMoney(this.primaryForm).subscribe(
      (response) => {
        this.toast.success(response.msg);
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, "AGREGAR DINERO");
      }
    );
  }
  openValidation(md: any, size = 'md') {
    if (!this.primaryForm.valid) {
      this.toast.warning('¡Complete los campos requeridos!');
      return;
    }
    this.modalRef = this.modal.open(md, {
      size: size,
      backdrop: 'static'
    });
  }

}
