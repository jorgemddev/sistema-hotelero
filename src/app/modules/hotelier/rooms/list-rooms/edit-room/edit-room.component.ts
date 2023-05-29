import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Rooms } from 'src/app/models/interfaces/rooms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) { }
  ngOnInit(): void {
    if (this.room != null) {
      this.form.patchValue(this.room);
    }
  }
  @Input()
  room: Rooms;

  @Output()
  success = new EventEmitter<boolean>();
  items: any;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    room_number: new UntypedFormControl(),
    room_type: new UntypedFormControl(''),
    capacity: new UntypedFormControl(''),
    amenities: new UntypedFormControl("1"),
    price: new UntypedFormControl(''),
    neto: new UntypedFormControl(''),
    tax: new UntypedFormControl(19),
  });

  update() {
    this.api.updateRooms(this.form).subscribe(
      (res) => {
        this.toast.success('Habitación modificada', 'Gestión Habitaciones');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  calculePrice() {
    var sale = 0;
    var neto = parseInt(this.form.get('neto').value)
    var tax = parseInt(this.form.get('tax').value);
    var tx = ((neto * tax) / 100);
    console.log("INPUESTO:" + tx);
    sale = neto + tx;
    this.form.get('price').setValue(sale);
  }

}
