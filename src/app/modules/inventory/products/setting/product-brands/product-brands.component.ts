import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-brands',
  templateUrl: './product-brands.component.html',
  styleUrls: ['./product-brands.component.css']
})
export class ProductBrandsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
    private routeActive: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.getBrands();
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') != null) {
        console.log(params.get('id'));
        var id = params.get('id');

      }
    });
  }
  items: any;
  sForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  tForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    brand_id: new UntypedFormControl()
  });
  brandSelected:any;
  modelSelected:any;
  models: any;
  model: any;

  delete() {
    this.api.deleteBrands(this.sForm).subscribe(
      (response) => {
        this.toast.success(
          'Esta MARCA  fue  eliminado correctamente',
          'Marcas'
        );
        this.getBrands();

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

  goToUpdate(id: number) {
    this.router.navigate(['inventario/productos/marcas/editar/' + id]);
  }
  goToCreate() {
    console.log('create');
    this.router.navigate(['inventario/productos/marcas']);
  }

  getBrands() {
    this.api.listBrands(1).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
      },
      (e) => {
        this.items = [];
      }
    );
  }
  addBrand(md: any, size: string = "sm") {
    this.modal.open(md, {
      size: size,
    });
  }
  editBrand(md: any, item: any, size: string = "sm") {
    this.brandSelected=item;
    this.modal.open(md, {
      size: size,
    });
  }
  openSaveModel(md: any, item: any, size: string = "sm") {
    this.tForm.reset();
    this.brandSelected=item;
    this.modal.open(md, {
      size: size,
    });
  }
  openMdModel(md: any, item: any, size: string = "sm") {
    this.tForm.patchValue(item);
    this.modelSelected=item;
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
