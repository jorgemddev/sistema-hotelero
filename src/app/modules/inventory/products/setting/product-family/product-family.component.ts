import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Navs } from 'src/app/models/interfaces/navs';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-family',
  templateUrl: './product-family.component.html',
  styleUrls: ['./product-family.component.css']
})
export class ProductFamilyComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getFamilys();
  }
  items: any;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    father:new UntypedFormControl(),
    family_id: new UntypedFormControl(0),
  });
  idActive:number=0;
  sForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });

  familys: any;

  create() {
    this.api.createFamily(this.form).subscribe(
      (response) => {
        
        this.toast.success('Creado correctamente', 'Familias');
        this.getFamilys();
        this.modal.dismissAll();
      },
      (error) => {
        console.log('advertencia');
            this.toast.warning(error.error.mistakes,
          'Ocurrio un error al crear el registro, verifique'
        );
      }
    );
  }
  update(event:any) {
    console.log(event.selected);
    if (this.form.get('family_id').value == this.idActive) {
      this.toast.warning("No puede depender de su propia familia");
      return;
    }
    if ((this.form.get('family_id').value>0)&&(this.form.get('father').value==1)) {
      this.toast.warning("Una categoria padre, no puede depender de otra categoria");
      return;
    }
    this.api.updateFamilys(this.form).subscribe(
      (response) => {
        
        this.toast.success('Modificado correctamente', 'Familias');
        this.getFamilys();
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes,
          'No se pudo modificar'
        );
          }
    );
  }
  delete() {
    this.api.deleteFamilys(this.sForm).subscribe(
      (response) => {
        
        this.toast.success(
          'Esta FAMILIA  fue  eliminado correctamente',
          'Familias'
        );
        this.getFamilys();

        this.modal.dismissAll();
      },
      (error) => {
            this.toast.warning(error.error.mistakes,
          'NO fue posible eliminar este item'
        );
      }
    );
  }
  getFamily(id: any) {
    this.api.getFamily(id).subscribe(
      (response) => {
        this.form.patchValue(response.data);
      },
      (error) => {
          }
    );
  }
  getFamilys() {
    this.api.listFamilys(1).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.getFamilyFather();
      },
      (error) => {
            this.items=[];
      }
    );
  }
  getFamilyFather() {
    this.api.getFamilyFathers().subscribe(
      (response) => {
        this.familys = response.data;
      },
      (error) => {
            this.toast.warning(error.error.msg);
      }
    );
  }
  openSaveFamily(md: any, size: string = "sm") {
    this.modal.open(md, {
      size: size,
    });
  }
  openUpdateFamily(md: any, item: any, size: string = "sm") {
    this.form.reset();
    this.form.patchValue(item);
    this.idActive=item.id;
    console.log(item);
    if (item.family_id == 0) {
      this.form.get('family_id').setValue(0);
    }
    this.modal.open(md, {
      size: size,
    });
  }

  openDelete(id: number, md: any) {
    this.sForm.get('id').setValue(id);
    this.modal.open(md, {
      size: 'md',
    });
  }
}
