import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Amenities } from 'src/app/models/interfaces/amenities';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit, OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.rooms_id > 0) {
      this.form2.get('rooms_id').setValue(this.rooms_id);
    }
  }
  ngOnInit(): void {
    console.log("ROOMS",this.rooms_id);
    this.getAmenities();
    if (this.rooms_id > 0) {
      this.form2.get('rooms_id').setValue(this.rooms_id);
    }
  }

  @Input()
  rooms_id: number=0;

  @Output()
  success = new EventEmitter<boolean>();
  items: any;
  form = new UntypedFormGroup({
    tag: new UntypedFormControl(),
    detail: new UntypedFormControl(''),
  });
  form2 = new UntypedFormGroup({
    rooms_id: new UntypedFormControl(0),
    amenities_id: new UntypedFormControl(0),
  });
  addnew: boolean = false;
  amenities: Amenities[];
  create() {
    this.api.createAmenities(this.form).subscribe(
      (res) => {
        this.toast.success('Creada correctamente', 'Gestión servicios');
        this.addnew = false;
        this.getAmenities();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  addRoomService() {
    if (this.form2.get('amenities_id').value == 0) {
      this.toast.warning("Debe seleccionar un servicio valido");
      return;
    }
    this.api.createAmenitie(this.form2).subscribe(
      (res) => {
        this.toast.success('Servicio agregado correctamente', 'Gestión servicios');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  getAmenities() {
    this.api.getAllAmenities().subscribe((res) => {
      this.amenities = res.data as Amenities[];
    }, (e) => { this.toast.warning(e.error.mistakes, e.error.msg) });
  }
}
