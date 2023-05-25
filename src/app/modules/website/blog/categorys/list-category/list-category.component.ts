import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Responses } from 'src/app/models/interfaces/responses';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css'],
})
export class ListCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private request: RequestsService,
    private api: ApiService,
    private routeActive: ActivatedRoute,
    private modal:NgbModal,
    private toast:ToastrService
  ) {}
  level: any;
  action: string = 'create';
  editId: number = 0;
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null && data['action'] == 'editar') {
      this.action = 'edit';
      console.log('id:' + data['id']);
    } else {
      this.action = 'create';
    }
    this.getCategorys();
    this.level = sessionStorage.getItem('ccviLevel')
      ? sessionStorage.getItem('ccviLevel')
      : 0;
  }
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(0),
  });
  update(id: number) {
    console.log('update', id);
    this.router.navigate(['/sitio-web/noticias/categorias/editar/' + id]);
    this.editId = id;
  }

  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;
  openDelete(id: number, md: any) {
    this.primaryForm.get('id').setValue(id);
    this.modal.open(md, { size: 'md' });
  }
  delete() {
    this.api.deleteCategory(this.primaryForm).subscribe(
      (response) => {
        this.items = response.data;
        this.toast.success('Categoria eliminada correctamente', 'Categorias');
        this.modal.dismissAll();
        this.getCategorys();
      },
      (error) => {
        this.request.setCode(error);
        this.toast.warning(error.error.mistakes,"No fue eliminado");
      }
    );
  }
  getCategorys() {
    this.api.getCategorys().subscribe(
      (response) => {
        var data = response.data as Responses;
          this.items = data;
      },
      (error) => {
        this.toast.warning('Tenemos un error al cargar el contenido','Categorias');
        this.request.setCode(error);
      }
    );
  }
}
