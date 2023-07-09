import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiSalesService } from '../../api-sales.service';

@Component({
  selector: 'app-pos-remove',
  templateUrl: './pos-remove.component.html',
  styleUrls: ['./pos-remove.component.css']
})
export class PosRemoveComponent implements OnInit {
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
    this.api.removeMoney(this.primaryForm).subscribe(
      (response) => {
        this.toast.success(response.msg);
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, "RETIRO DE  DINERO");
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
