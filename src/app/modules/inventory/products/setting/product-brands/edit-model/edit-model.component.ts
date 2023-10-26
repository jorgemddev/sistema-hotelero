import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    console.log("id" + this.id);
    if (this.id > 0) {
      this.getModel(this.id);
    }
  }
  @Input()
  id: number;

  @Input()
  dismiss:boolean=true;

  @Output()
  success = new EventEmitter<boolean>();
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    brand_id: new UntypedFormControl()
  });
  updateModel() {
    this.api.updateModel(this.form).subscribe(
      (rs) => {
        this.toast.success('Modificado correctamente', 'Modelos');
        this.success.emit(true);
        if(this.dismiss){
        this.modal.dismissAll();
        }
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
  delete() {
    this.api.deleteModel(this.form).subscribe(
      (response) => {
        this.toast.success(
          'Este Modelo fue  eliminado correctamente',
          'Modelos'
        );
        this.success.emit(true);
        if(this.dismiss){
        this.modal.dismissAll();
        }
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
  getModel(id: any) {
    this.api.getModel(id).subscribe(
      (rs) => {
        this.form.patchValue(rs.data);
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
}
