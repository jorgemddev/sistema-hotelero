import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router
  ) {}
  status: any;
  categorys: any;
  @Output()
  success = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.getData();
  }

  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    detail: new UntypedFormControl(''),
    state_id: new UntypedFormControl(1),
    category_id: new UntypedFormControl(0),
  });

  create() {
    this.api.createCategory(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Categoria creada correctamente', '¡Todo bien!');
        this.router.navigate(['/sitio-web/noticias/categorias']);
        this.success.emit(true);
      },
      (error) => {
        this.error = error;
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  getData() {
    this.api.getCategorys().subscribe(
      (response) => {
        this.categorys = response.data;
      },
      (error) => {
        this.error = error;
      }
    );

    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
