import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Amenities } from 'src/app/models/interfaces/amenities';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.service_id > 0) {
      this.getAmenities(this.service_id);
    }
  }
  ngOnInit(): void {
    if (this.service_id > 0) {
      this.getAmenities(this.service_id);
    }
  }

  @Input()
  service_id: number = 0;
  @Input()
  eminities_id: number = 0;


  @Output()
  success = new EventEmitter<boolean>();
  items: any;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    tag: new UntypedFormControl(),
    detail: new UntypedFormControl(''),
  });
  getAmenities(id: number) {
    this.api.getAllAmenitie(id).subscribe((res) => {
      this.form.patchValue(res.data);
    }, (e) => { this.toast.warning(e.error.mistakes, e.error.msg); });
  }
  update() {
    this.api.updateAmenities(this.form).subscribe(
      (res) => {
        this.toast.success('Servicio modificado correctamente', 'Gestión servicios');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  deleteService() {
    this.api.deleteAmenities(this.form).subscribe((res) => {
      this.toast.success(res.msg);
      this.success.emit(true);
      this.modal.dismissAll();
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
  removeService() {
    this.form.get('id').setValue(this.eminities_id);
    this.api.removeService(this.form).subscribe((res) => {
      this.toast.success(res.msg);
      this.success.emit(true);
      this.modal.dismissAll();
    }, (e) => {
      this.toast.warning(e.error.mistakes, e.error.msg);
    });
  }
  openModal(mdl: any, size: string = 'sm') {
    this.modal.open(mdl, { size: size });
  }
}
