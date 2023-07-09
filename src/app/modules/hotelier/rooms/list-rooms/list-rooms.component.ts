import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Toolbar } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { Rooms } from 'src/app/models/interfaces/rooms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private routeActive: ActivatedRoute,
  ) { }
  selected:any;
  ngOnInit(): void {
    this.getRooms();
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        console.log(params.get('id'));
        var id = params.get('id');

      }
    });
  }
  toolbar: Toolbar = {
    buttons: [{ id: 1, iconFaWSome: 'fa-circle-plus', value: 'AGREGAR' }]
  };
  items: Rooms[];
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
  });
  sForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  tForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    brand_id: new UntypedFormControl()
  });
  models: any;
  model: any;
  save() {
    if (this.form.get('id')?.value > 0) {
      this.update();
    } else {
      this.create();
    }
  }
  create() {
    this.api.createBrand(this.form).subscribe(
      (response) => {
        this.toast.success('Creado correctamente', 'Marcas');
        this.getRooms();
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
  update() {
    this.api.updateBrands(this.form).subscribe(
      (response) => {
        this.toast.success('Modificado correctamente', 'Marcas');
        this.getRooms();
        this.modal.dismissAll();
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
    this.api.deleteRooms(this.sForm).subscribe(
      (response) => {
        this.toast.success(
          'Esta Habitación  fue  eliminado correctamente',
          'Habitaciones'
        );
        this.getRooms();

        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
 

  getRoom(id: any) {
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
  getRooms() {
    this.api.listRooms(1).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items as Rooms[];
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
  outService(){
    let status=(this.selected.availability_id==5)?1:5;
    const formx = new UntypedFormGroup({
      id: new UntypedFormControl(),
      availability_id: new UntypedFormControl(status),
    });
    formx.get('id').setValue(this.selected.id);
    this.api.setStatusRoom(formx).subscribe((res) => {
      this.toast.success('Ha bloqueado esta habitación');
      this.getRooms();
     }, (e) => { 
      this.toast.warning(e.error.mistakes,e.error.msg);
     });
  }
  openUpdate(item: any,md: any , size: string = "md") {
    this.selected=null;
    this.selected=item;
    this.modal.open(md, {
      size: size,
    });
  }

  openModal(mdl: any, size: string = 'md',item:any=null) {
    if(item!=null){
      console.log("SELECTED->",item);
      this.selected=item;
    }
    this.modal.open(mdl, { size: size });
  }
  openDelete(id: number, md: any) {
    this.sForm.get('id').setValue(id);
    this.modal.open(md, {
      size: 'sm',
    });
  }
}
