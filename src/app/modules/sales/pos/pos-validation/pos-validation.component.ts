import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbConfig, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { formatRut, RutFormat } from '@fdograph/rut-utilities';
import { ApiSalesService } from '../../api-sales.service';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-pos-validation',
  templateUrl: './pos-validation.component.html',
  styleUrls: ['./pos-validation.component.css']
})
export class PosValidationComponent implements OnInit {
  payment: any;
  constructor(
    private api: ApiSalesService,
    private toast: ToastrService,

  ) {
  }


  ngOnInit(): void {
    //this.modalConfig.windowClass = 'modal-backdrop-danger';
   
  }
  @Output()
  success = new EventEmitter<boolean | any>();
  @Input()
  modalRef: NgbModalRef;

  primaryForm = new UntypedFormGroup({
    rut: new UntypedFormControl(''),
    pass: new UntypedFormControl('')
  });

  validate() {
    this.api.validateTransaction(this.primaryForm).subscribe(
      (res) => {
        this.toast.success(res.msg);
        this.success.emit(res.data);
      },
      (error) => {
        this.toast.warning(error.error.mistakes, error.error.msg);
      }
    );
  }
  onFormatRut(value: any) {
    if (value.target.value.length > 8) {
      this.primaryForm
        .get('rut')
        ?.setValue(formatRut(value.target.value, RutFormat.DOTS_DASH));
    }
  }

}
