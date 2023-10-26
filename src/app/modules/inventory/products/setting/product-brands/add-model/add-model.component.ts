import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnChanges, OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private routeActive: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    console.log("init brandId:"+this.brandId);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes brandId:"+this.brandId);
    this.brandId;
  }
  @Input()
  brandId: number=0;
  @Input()
  dismiss:boolean=true;
  @Output()
  success = new EventEmitter<boolean>();
  @Output()
  onDataCreate=new EventEmitter<any>();

  brand: any;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    brand_id: new UntypedFormControl()
  });
  createModel() {
    this.form.get('brand_id')?.setValue(this.brandId);
    this.api.createModel(this.form).subscribe(
      (rs) => {
        this.toast.success('Registro creado correctamente', 'Modelos');
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
