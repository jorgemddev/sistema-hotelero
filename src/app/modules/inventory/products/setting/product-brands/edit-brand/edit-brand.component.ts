import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private routeActive: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    if (this.brandId > 0) {
      this.getBrand(this.brandId);
    }
  }
  @Input()
  brandId: number;

  @Input()
  dismiss:boolean=true;

  @Output()
  success = new EventEmitter<boolean>();

  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
  });
  update() {
    this.api.updateBrands(this.form).subscribe(
      (rs) => {
        this.toast.success('Modificada correctamente', 'Marca');
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
  getBrand(id: any) {
    this.api.getBrand(id).subscribe(
      (response) => {        
        this.form.patchValue(response.data);
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


