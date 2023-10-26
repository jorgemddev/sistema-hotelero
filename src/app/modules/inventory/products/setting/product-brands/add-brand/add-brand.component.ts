import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private routeActive: ActivatedRoute,
  ) { }
  
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
  });

  @Input()
  dismiss:boolean=true;
  @Output()
  success=new EventEmitter<boolean>();
  @Output()
  onDataCreate=new EventEmitter<any>();
  
  create() {
    this.api.createBrand(this.form).subscribe(
      (rs) => {
        this.toast.success('Creada correctamente', 'Marcas');
        this.success.emit(true);
        this.onDataCreate.emit(rs.data);
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
}
