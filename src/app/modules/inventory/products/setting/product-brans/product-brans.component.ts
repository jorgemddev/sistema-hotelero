import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Navs } from 'src/app/models/interfaces/navs';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-product-brans',
  templateUrl: './product-brans.component.html',
  styleUrls: ['./product-brans.component.css']
})
export class ProductBransComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private request: RequestsService,
    private routeActive: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.getBrands();
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        console.log(params.get('id'));
        var id = params.get('id');
        this.getBrand(id);
      }
    });
  }
  items: any;
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
    brand_id:new UntypedFormControl()
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
        this.request.setLoading(false);
        this.toast.success('Creado correctamente', 'Marcas');
        this.getBrands();
        this.modal.dismissAll();
      },
      (error) => {
        console.log('advertencia');
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,
          'Ocurrio un error al crear el registro, verifique'
        );
      }
    );
  }
  update() {
    this.api.updateBrands(this.form).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success('Modificado correctamente', 'Marcas');
        this.getBrands();
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes,
          'No se pudo modificar'
        );
        this.request.setCode(error);
      }
    );
  }
  createModel() {
    this.api.createModel(this.tForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success('Registro creado correctamente', 'Modelos');
        this.getBrands();
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes,
          'No se pudo modificar'
        );
        this.request.setCode(error);
      }
    );
  }
  updateModel() {
    this.api.updateModel(this.tForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success('Modificado correctamente', 'Modelos');
        this.getBrands();
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes,
          'No se pudo modificar'
        );
        this.request.setCode(error);
      }
    );
  }
  delete() {
    this.api.deleteBrands(this.sForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success(
          'Esta MARCA  fue  eliminado correctamente',
          'Marcas'
        );
        this.getBrands();

        this.modal.dismissAll();
      },
      (error) => {
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,
          'NO fue posible eliminar este item'
        );
      }
    );
  }
  deleteModel() {
    this.api.deleteModel(this.tForm).subscribe(
      (response) => {
        this.request.setLoading(false);
        this.toast.success(
          'Este MODELO fue  eliminado correctamente',
          'Modelos'
        );
        this.getBrands();

        this.modal.dismissAll();
      },
      (error) => {
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,
          'No fue posible eliminar este item'
        );
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['inventario/productos/marcas/editar/' + id]);
  }
  goToCreate() {
    console.log('create');
    this.router.navigate(['inventario/productos/marcas']);
  }

  getBrand(id: any) {
    this.api.getBrand(id).subscribe(
      (response) => {
        this.form.patchValue(response.data);
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  getBrands() {
    this.api.listBrands(1).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
      },
      (error) => {
        this.request.setCode(error);
      }
    );
  }
  openSaveBrand(md: any, size: string = "sm") {
    this.form.reset();
    this.modal.open(md, {
      size: size,
    });
  }
  openUpdateBrand(md: any, item: any, size: string = "sm") {
    this.form.reset();
    this.form.patchValue(item);
    this.modal.open(md, {
      size: size,
    });
  }
  openSaveModel(md: any, item: any, size: string = "sm") {
    this.tForm.reset();
    this.tForm.get('brand_id').setValue(item.id);
    this.modal.open(md, {
      size: size,
    });
  }
  openMdModel(md: any, item: any, size: string = "sm") {
    this.tForm.patchValue(item);
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
