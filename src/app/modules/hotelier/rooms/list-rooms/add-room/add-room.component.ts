import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}
  @Output()
  success=new EventEmitter<boolean>();
  items: any;
  primaryForm = new UntypedFormGroup({
    room_number: new UntypedFormControl(),
    room_type: new UntypedFormControl(''),
    capacity: new UntypedFormControl(''),
    amenities:new UntypedFormControl("1"),
    price: new UntypedFormControl(''),
    neto: new UntypedFormControl(''),
    tax: new UntypedFormControl(19),
  });

  create() {
    this.api.createRooms(this.primaryForm).subscribe(
      (res) => {
        this.toast.success('Creada correctamente', 'Gestión Habitaciones');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(e.error.mistakes, e.error.msg);
      }
    );
  }
  calculePrice(){
    var sale=0;
    var neto=parseInt(this.primaryForm.get('neto').value)
    var tax=parseInt(this.primaryForm.get('tax').value);
    var tx=((neto*tax)/100);
    console.log("INPUESTO:"+tx);
    sale=neto+tx;
    this.primaryForm.get('price').setValue(sale);    

  }
}
